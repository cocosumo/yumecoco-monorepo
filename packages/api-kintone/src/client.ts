import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { getNewAccessToken } from './@auth/getNewAccessToken';

const isTest = process.env.NODE_ENV === 'test';

const oAuth = {
  token: '',
  at: null as Date | null,
};

let kintoneRestApiClient : KintoneRestAPIClient | null  = null;

const setToken = (oAuthToken: string) => {
  if (!oAuthToken) throw new Error('Invalid oAuthToken');
  oAuth.token = oAuthToken;
  oAuth.at = new Date();
};


const getToken = async () => {
  if (!oAuth.token) {
    const { accessToken } = await getNewAccessToken();
    setToken(accessToken);
  }
  /** TODO: Need to check time too for server implementation */

  return oAuth.token;
};

export const kintoneBaseUrl = process.env.KT_BASE_URL;

export const kt = async () => {

  /* If running on node, retrieve access token dynamically then re-define client. */
  if (typeof window === 'undefined' || isTest) {
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