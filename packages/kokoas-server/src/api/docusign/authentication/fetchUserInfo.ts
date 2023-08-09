
import { IGetUserInfoResponse } from 'types';
import { accoutId, apiClient } from '../../../config';
import { getJwtGrantToken } from './fetchAccessToken';



/**
 * Get user info.
 *
 * @returns {IGetUserInfoResponse} returns Userinfo
 */
export const fetchUserInfo = async () => {

  /* JWTトークンのトークン有効性を確認し、リクエストに載せる */
  const jwtGrantToken = await getJwtGrantToken();

  const userInfo = await apiClient
    .getUserInfo(jwtGrantToken.accessToken);

  return userInfo as IGetUserInfoResponse;
};


export const getAccountId = async () => {

  // この処理がトークン有効性を確認する処理が入っているので、不可欠です。
  // api-docusignに移行したら、リファクタリングします。

  const userInfo = await fetchUserInfo();

  const defaultUser = userInfo.accounts.find(({ isDefault }) => isDefault === 'true');

  // docusignは公開していませんが、認証情報を強制的に取得します。
  const authorization =  (apiClient as unknown as { defaultHeaders: { Authorization: string } })?.defaultHeaders?.Authorization;

  console.log('BASE PATH:', apiClient.getBasePath());
  console.log('ACCOUNT ID: ', accoutId);
  console.log('AUTH: ', authorization);

  // docusign側は曖昧なエラーを出すので、ここでチェックして、エラーを出します。
  // ユーザ向けより、開発者向けです。
  if (!authorization) throw new Error('リクエストに認証情報はありませんでした。' );
  if (!defaultUser?.accountId) throw new Error('アカウント番号が取得出来ませんでした。' );

  return defaultUser.accountId;
};