
import { IGetUserInfoResponse } from 'types';
import { accoutId, apiClient } from '../../../config';
import { getJwtGrantToken } from './fetchAccessToken';

let userInfo: IGetUserInfoResponse | undefined;

/**
 * Get user info.
 *
 * @returns {IGetUserInfoResponse} returns Userinfo
 */
export const fetchUserInfo = async () => {
  const jwtGrantToken = await getJwtGrantToken();

  userInfo = await apiClient
    .getUserInfo(jwtGrantToken.accessToken);

  return userInfo as IGetUserInfoResponse;
};


export const getAccountId = async () => {
  console.log('ACCOUNT ID: ', accoutId);
  return accoutId;
};