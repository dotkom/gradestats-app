export const fetcher = async <T>(url: string) => {
  const uri = encodeURI(url);
  const response = await fetch(uri);
  const data = await response.json();
  return data as T;
};

export interface ListResponse<Data> {
  count: number;
  results: Data[];
}

export const poster = async <Data>(url: string, data: Data, accessToken?: string) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
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
