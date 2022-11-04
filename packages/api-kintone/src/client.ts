import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { loadEnv } from 'helpers';
import { getNewAccessToken } from './auth/getNewAccessToken';
loadEnv();

const oAuth = {
  token: '',
  at: null as Date | null,
};

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

export const client = async () => {

  return new KintoneRestAPIClient({
    baseUrl: process.env.KT_BASE_URL,
    auth: { oAuthToken: await getToken() },
  });
};

export const clientRecord = client().then(({ record }) => record);