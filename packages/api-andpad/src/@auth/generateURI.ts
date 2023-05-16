/* eslint-disable no-console */
import qs from 'qs';
import { clientId, redirectURI } from '../config';
import { endpoints } from '../endpoints';

/**
 *
 * 発行された 認可コードの有効期限は10分 です。有効期限が切れた場合、再取得をしてください。
 */
export const generateURI = () => {
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectURI,
    scope: 'openid+workman', // エンコードされるとエラーになるので、+ を手打ちにする
  };

  const url = `${endpoints.authCode}?${qs.stringify(params)}`;

  console.log(url);
  console.log('発行された 認可コードの有効期限は10分 です。有効期限が切れた場合、再取得をしてください。');

  return url;
};