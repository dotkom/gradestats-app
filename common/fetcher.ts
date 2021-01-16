import { getUserClient } from './auth/utils';

export interface ListResponse<Data> {
  count: number;
  results: Data[];
}

const getHeaders = async () => {
  const user = await getUserClient();
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  if (user?.accessToken) {
    headers.set('Authorization', `Bearer ${user.accessToken}`);
  }
  return headers;
};

export const fetcher = async <T>(url: string) => {
  // hashtags will hopefully never be used in a server call
  const uri = encodeURI(url).replace('#', '%23');
  const headers = await getHeaders();
  const response = await fetch(uri, {
    method: 'GET',
    headers,
  });
  const data = await response.json();
  return data as T;
};

export const poster = async <Data>(url: string, data: Data) => {
  const headers = await getHeaders();
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });
  const responseData = await response.json();

  if (response.status === 400) {
    const messages: string[] = [];
    Object.values(responseData).forEach((message) => {
      if (Array.isArray(message)) {
        messages.push(...message);
      } else {
        messages.push(message as string);
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
