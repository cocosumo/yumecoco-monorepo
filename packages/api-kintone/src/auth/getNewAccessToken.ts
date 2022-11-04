
import axios from 'axios';
import qs from 'qs';
import { loadEnv } from 'helpers';
loadEnv();

export const getNewAccessToken = async () => {

  const {
    KT_BASE_URL,
    KT_CLIENT_ID,
    KT_CLIENT_SECRET,
    KT_REFRESH_TOKEN,
  } = process.env;

  const clientAuth = Buffer.from(`${KT_CLIENT_ID}:${KT_CLIENT_SECRET}`).toString('base64');
  if (!KT_REFRESH_TOKEN) throw new Error('No refresh token. See readme.md to generate.');

  const data = {
    'grant_type': 'refresh_token',
    'refresh_token': KT_REFRESH_TOKEN,
  };


  const result = await axios({
    method: 'POST',
    url: `${KT_BASE_URL}oauth2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${clientAuth}`,

    },
    data: qs.stringify(data),
  });

  const resultData = result.data as {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string
  };

  return {
    accessToken: resultData.access_token,
    token_type: resultData.token_type,
    expires_in: resultData.expires_in,
    scope: resultData.scope,
  };

};