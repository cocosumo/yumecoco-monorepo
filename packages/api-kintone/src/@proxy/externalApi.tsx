import { HttpMethod } from '@kintone/rest-api-client/lib/http/HttpClientInterface';

export const externalApi = async <T = unknown, D = unknown>(
  url: string,
  method: HttpMethod,
  headers: T,
  data: D,
) => {
  try {
    const resp = await kintone.proxy(url, 'POST', headers, data);

    const [
      body,
      status,
    ] = resp;

    if (status === 200) {
      return body;
    } else if (status === 404) {
      throw new Error(`Failed to access server ${url}`);
    } else {
      throw new Error(`${status} Unhandled.`);
    }

  } catch (err) {
    throw new Error(err.message);
  }

};