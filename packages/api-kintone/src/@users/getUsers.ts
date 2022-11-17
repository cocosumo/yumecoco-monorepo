import axios from 'axios';
import { IGetUsersResult } from 'types';
import { ktClient } from '../client';



/**
 * Get kintone users by ids.
 * https://kintone.dev/en/docs/common/user-api/users/get-users/
 *
 * @param obj if not defined, will retrieve all users
 * @returns {Promise<IGetUsersResult>} user api's return type
 */
export const getUsers = async ({
  ids, codes,
}: {
  ids?: number[] | number,
  codes?: string[] | string,
}) => {
  const KintoneClient = await ktClient();
  try {
    const baseUrl = `${KintoneClient.getBaseUrl()}`;
    const api = '/v1/users.json';
    const endpoint = `${baseUrl}${api}`;

    const auth = process.env.KT_LOGIN_AUTH;

    if (!auth) throw new Error('Invalid authentication.');

    const cleanIds = ids ? ([] as number[]).concat(ids) : ids;
    const cleanCodes = codes ? ([] as string[]).concat(codes) : codes;

    const { status, data } = await axios({
      url: endpoint,
      method: 'get',
      data: {
        ids: cleanIds,
        codes: cleanCodes,
      },
      headers: {
        'X-Cybozu-Authorization': auth,
      },
    });


    if (status === 200) {
      return data as IGetUsersResult;
    } else {
      throw new Error(`Request failed. status: ${status} ${data}`);
    }
  } catch (err: any) {
    throw new Error(`getUsers: ${err?.response?.data?.message}`);
  }
};
