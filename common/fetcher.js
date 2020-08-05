import fetch from 'isomorphic-fetch';

export const fetcher = async (url) => {
  const uri = encodeURI(url);
  const response = await fetch(uri);
  const data = await response.json();
  return data;
};

export const poster = async (url, data, accessToken) => {
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
    const messages = [];
    Object.values(responseData).forEach((message) => {
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
