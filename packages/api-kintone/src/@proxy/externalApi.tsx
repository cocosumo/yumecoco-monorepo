import { HttpMethod } from '@kintone/rest-api-client/lib/http/HttpClientInterface';

export const externalApi = async <T = unknown, D = unknown>(
  url: string,
  method: HttpMethod,
  headers: T,
  data: D,
) => {
  try {
    kintone.proxy(url, 'POST', headers, data);
  } catch (err) {
    throw new Error(err.message);
  }

};