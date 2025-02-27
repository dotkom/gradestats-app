import { GetServerSidePropsContext } from 'next';
import { getUser } from './auth/utils';
import { Nullable } from './utils/types';

export interface ListResponse<Data> {
  count: number;
  results: Data[];
}

interface RequestsConstructor {
  accessToken?: string;
  useAuthentication?: boolean;
}
export class Requests {
  private accessToken?: string;
  private tokenExpiresAt?: number;
  private useAuthentication: boolean;

  constructor({ accessToken, useAuthentication = true }: RequestsConstructor) {
    this.accessToken = accessToken;
    this.useAuthentication = useAuthentication;
  }

  static fromSession = async (context: GetServerSidePropsContext) => {
    const user = await getUser(context);
    return new Requests({ accessToken: user?.accessToken });
  };

  getAccessToken = async () => {
    if (!this.useAuthentication) {
      return;
    }
    if (this.accessToken && (!this.tokenExpiresAt || this.tokenExpiresAt >= Date.now())) {
      return this.accessToken;
    }
    const user = await getUser();
    if (user) {
      this.accessToken = user.accessToken;
      this.tokenExpiresAt = user.expiresAt;
    }
    return user?.accessToken;
  };

  getHeaders = async () => {
    const accessToken = await this.getAccessToken();
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  };

  handleResponse = async <Data>(response: Response) => {
    const responseData = (await response.json()) as Data;
    if (response.status === 400) {
      const messages: string[] = [];
      Object.values(responseData as Record<string, string | string[]>).forEach((message) => {
        if (Array.isArray(message)) {
          messages.push(...message);
        } else {
          messages.push(message);
        }
      });
      return {
        status: 400,
        messages,
      };
    }
    if (response.ok) {
      return {
        status: response.status,
        data: responseData,
      };
    }

    throw response;
  };

  get = async <T>(url: string) => {
    // hashtags will hopefully never be used in a server call
    const uri = encodeURI(url).replace('#', '%23');
    const headers = await this.getHeaders();
    const response = await fetch(uri, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data as T;
  };

  post = async <ResponseData, RequestData = ResponseData>(url: string, data: RequestData) => {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    });
    const responseData = this.handleResponse<ResponseData>(response);
    return responseData;
  };

  put = async <ResponseData, RequestData = ResponseData>(url: string, data: RequestData) => {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers,
    });
    const responseData = this.handleResponse<ResponseData>(response);
    return responseData;
  };

  patch = async <ResponseData, RequestData = Nullable<ResponseData>>(url: string, data: RequestData) => {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers,
    });
    const responseData = this.handleResponse<ResponseData>(response);
    return responseData;
  };

  delete = async <ResponseData = null>(url: string) => {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    const responseData = this.handleResponse<ResponseData>(response);
    return responseData;
  };
}

// TODO: enable authentication when server authentication delay has been fixed
export const requests = new Requests({ useAuthentication: false });
export const requestsWithAuth = new Requests({ useAuthentication: true });
