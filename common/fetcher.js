import fetch from 'isomorphic-fetch';

export const fetcher = async (url) => {
  const uri = encodeURI(url);
  const response = await fetch(uri);
  const data = await response.json();
  return data;
};
