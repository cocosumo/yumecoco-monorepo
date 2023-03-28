import { HttpMethod } from '@kintone/rest-api-client/lib/http/HttpClientInterface';
import axios from 'axios';

/**
 * より簡単にブラウザー側の結合テストを行うために、kintone.proxyをラップする。
 * Kintoneの内のブラウザ側の結合テストは通常のHTTP requestが使えないので、kintone.proxyを使う
 * 
 * kintoneじゃない環境では、axiosを使う。
 * 
 * @see https://cybozu.dev/ja/kintone/docs/js-api/proxy/kintone-proxy/
 */
export const kintoneProxyWrapper = async ({
  url,
  method,
  headers,
  data,
}: {
  url: string,
  method: HttpMethod,
  headers: Record<string, string>,
  data:Record<string, string>
}) => {
  if (kintone) {
    const result = await kintone.proxy(url, method, headers, data);
    const [body, status] = result;
    return {
      data: JSON.parse(body),
      status,
    };
  } else {
    const result = await axios({
      url,
      method,
      headers,
      data,
    });
    return result;
  }

};