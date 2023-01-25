import axios from 'axios';
import { authCode, clientId, redirectURI, secretId } from '../config';
import { endpoints } from '../endpoints';

/* 仮実装、JSONに格納予定 */
export let andpadToken = {
  access_token: '-ZoDhtg',
  token_type: '',
  expires_in: 0,
  refresh_token: '',
  scope: '',
  created_at: 0,
  id_token: '',
};

/**
 *
 * 発行された アクセストークンの有効期限は3ヶ月 です。
 * 有効期限が切れた場合、アクセストークンのリフレッシュをしてください。
 */
export const fetchToken = async () => {
  try {

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


/* WIP　ここにトークンの管理が入ります。 */
export const getToken = async () => {

  try {

    if (!andpadToken.expires_in) {
      const { data } = await fetchToken();
      andpadToken = { ...data };
    }

    return andpadToken;

  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }


};


/* リフレッシュ */
export const refreshToken = async () => {

  try {

    if (!andpadToken.refresh_token) {
      throw new Error('Failed to retrieve refresh token.');
    }

    const { data } = await axios({
      url: endpoints.authToken,
      method: 'POST',
      data : {
        'grant_type': 'refresh_token',
        'client_id': clientId,
        'client_secret': secretId,
        'refresh_token': andpadToken.refresh_token,
      },
    });

    andpadToken = { ...data };

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }

};