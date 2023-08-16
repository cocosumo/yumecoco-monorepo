import { getAuthByServiceName } from 'api-kintone/src/authDB/getAuthByServiceName';
import { saveAuthByServiceName } from 'api-kintone/src/authDB/saveAuthByServiceName';
import axios from 'axios';
import { authCode, clientId, redirectURI, secretId } from '../config';
import { endpoints } from '../endpoints';
import tokenValid from '../helpers/tokenValid';
import { authToken, AuthToken } from '../types';



let andpadToken: AuthToken = {
  access_token: '',
  token_type: 'Bearer',
  expires_in: 0,
  refresh_token: '',
  scope: 'openid+workman',
  created_at: 0,
  id_token: '',
};

/** 設定する */
export const setAndpadToken = (newAuth: AuthToken) => {
  andpadToken = { ...newAuth };
};


/** authDBを更新する */
export const updateAuthDB = async <T = unknown>(data: T) => {
  const authInfo = authToken.parse(data);

  setAndpadToken(authInfo);

  const result = await saveAuthByServiceName('andpad', JSON.stringify(authInfo));

  console.log(`andpadの認証情報を更新しました。${result.revision}`);
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
    console.log('fetching token...');
    if (!clientId)
      throw new Error('clientIdを指定してください。');
    if (!secretId)
      throw new Error('secretIdを指定してください。');
    if (!authCode)
      throw new Error('authCodeを指定してください。generateURIから取得出来ます。');

    const { data } = await axios({
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

    await updateAuthDB(data);

    return andpadToken;

  } catch (err) {

    
    console.log((err as Error).message);
    throw new Error((err as Error).message);
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

    await updateAuthDB(data);

    return andpadToken;

  } catch (err) {
    console.error(err);
    throw new Error((err as Error).message);
  }

};




/**
 * アクセストークントークンの有効性を検証し、取得する
 *  */
export const getToken = async () => {

  try {

    /* 初期の際、authDBから取得 */
    if (!andpadToken.access_token) {
      const authInfo = await getAuthByServiceName<AuthToken>('andpad');
      const parsedAuthToken = authToken.parse(authInfo);

      if (!parsedAuthToken) {
        // 認証URLから取得が必要
        throw new Error('authDBにトークンが見つかりませんでした。');
      }

      setAndpadToken(parsedAuthToken);

    }

    if (!tokenValid(andpadToken)) {
      //　有効じゃなかったら、トークンをリフレッシュ
      console.log('トークンは無効です。再取得中。');
      await refreshToken();
    }

    const {
      access_token: accessToken,
    } = andpadToken;


    return accessToken;

  } catch (err) {
    console.log((err as Error).message);
    throw new Error((err as Error).message);
  }


};

