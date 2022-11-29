import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { addMinutes, isPast, format } from 'date-fns';
import { getNewAccessToken } from './@auth/getNewAccessToken';

const isTest = process.env.NODE_ENV === 'test';

/**
 * アクセストークンの有効期限は1時間です。
 * https://developer.cybozu.io/hc/ja/articles/360015955171-OAuth%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%81%AE%E4%BD%BF%E7%94%A8
 *  */
const minutesToExpire = 55; // 有効切れの5分前に更新
let oAuth : {
  token: string,
  at: Date
  ex: Date
};

let kintoneRestApiClient : KintoneRestAPIClient | null  = null;

const setToken = (oAuthToken: string) => {
  if (!oAuthToken) throw new Error('Invalid oAuthToken');
  const tokenCreated = new Date();
  oAuth = {
    token: oAuthToken,
    at: tokenCreated,
    ex: addMinutes(tokenCreated, minutesToExpire),
  };

  console.log(oAuth);
  console.log('Token created at : ', format(oAuth.at, 'PPpp') );
  console.log('Token expires at : ', format(oAuth.ex, 'PPpp') );

};


const getToken = async () => {

  const { accessToken } = await getNewAccessToken();
  setToken(accessToken);

  return oAuth.token;
};

const isTokenExpired = () => !oAuth?.ex || isPast(oAuth?.ex);

export const kintoneBaseUrl = process.env.KT_BASE_URL;



export const kt = async () => {

  /**
   * Re-instantiate kintone client when:
   * - on Node and
   * - on test or token expired
   * */
  if (
    typeof window === 'undefined'
    && (
      isTest || isTokenExpired()
    )
  ) {
    kintoneRestApiClient = new KintoneRestAPIClient({
      baseUrl: kintoneBaseUrl,
      auth: { oAuthToken: await getToken() },
    });
  }

  /* If running on kintone, no need for auth. Define once. */
  if (!kintoneRestApiClient) {
    kintoneRestApiClient = new KintoneRestAPIClient({
      baseUrl: process.env.KT_BASE_URL,
    });
  }

  return kintoneRestApiClient;
};

export const ktClient = () => kt().then((kintoneClient)=> kintoneClient);

export const ktRecord = () => ktClient().then(({ record }) => record );

export const ktApp = () => ktClient().then(({ app }) => app );
