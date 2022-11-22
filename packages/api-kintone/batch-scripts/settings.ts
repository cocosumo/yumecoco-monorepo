import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { kintoneBaseUrl } from 'api-kintone/src';
import { getBasicKintoneAuth } from 'api-kintone/src/@auth/getBasicKintoneAuth';

const {
  password,
  username,
} = getBasicKintoneAuth();



/**
 * oAuth2だとbulkRequestのAPIが使えないので、
 * バッチスクリプトはbasicで認証します。
 *
 * 現状、スコープリストにはないです。~ ras 2022.11.22
 *
 * 参考：
 *
 * https://developer.cybozu.io/hc/ja/articles/360015955171-OAuth%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%81%AE%E4%BD%BF%E7%94%A8
 */
export const KintoneClientBasicAuth = new KintoneRestAPIClient({
  baseUrl: kintoneBaseUrl,
  auth: {
    username,
    password,
  },
});