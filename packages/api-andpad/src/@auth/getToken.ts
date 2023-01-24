import { getAuthByServiceName } from 'api-kintone/src/authDB/getAuthByServiceName';
import axios from 'axios';
import { authCode, clientId, redirectURI, secretId } from '../config';
import { endpoints } from '../endpoints';
import { authToken, AuthToken } from '../types';

let andpadToken: AuthToken = {
  access_token: '',
  token_type: 'Bearer',
  expires_in: 0,
  refresh_token: '',
  scope: 'openid',
  created_at: 0,
  id_token: '',
};


/**
 * トークンを取得する
 *
 * 発行された アクセストークンの有効期限は3ヶ月 です。
 * 有効期限が切れた場合、アクセストークンのリフレッシュをしてください。
 *
 */
export const fetchToken = async () => {
  try {

    if (!clientId)
      throw new Error('clientIdを指定してください。');
    if (!secretId)
      throw new Error('secretIdを指定してください。');
    if (!authCode)
      throw new Error('authCodeを指定してください。generateURIから取得出来ます。');

    return await axios({
      url: endpoints.authToken,
      method: 'POST',
      data : {
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'client_secret': secretId,
        'code': authCode,
        'redirect_uri': redirectURI,
      },
    });


  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};



/**
 * リフレッシュトークンによって、トークンを取得する
 * アクセストークンのリフレッシュをした際、以前のアクセストークンは無効になります。
 *  */
export const refreshToken = async () => {

  try {

    if (!andpadToken.refresh_token) {
      throw new Error('Failed to retrieve refresh token.');
    }

    return await axios({
      url: endpoints.authToken,
      method: 'POST',
      data : {
        'grant_type': 'refresh_token',
        'client_id': clientId,
        'client_secret': secretId,
        'refresh_token': andpadToken.refresh_token,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }

};


/**
 * アクセストークントークンを管理。
 *  */
export const getToken = async () => {

  try {

    /* 初期の際、authDBから取得 */
    if (!andpadToken.access_token) {
      const authInfo = await getAuthByServiceName<AuthToken>('andpad');
      const parsedAuthToken = authToken.parse(authInfo);

      if (!parsedAuthToken)
        throw new Error('authDBにトークンが見つかりませんでした。管理者にご連絡ください。');

      andpadToken = {
        ...parsedAuthToken,
      };

    }

    const {
      access_token: accessToken,
    } = andpadToken;

    return accessToken;

  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }


};

