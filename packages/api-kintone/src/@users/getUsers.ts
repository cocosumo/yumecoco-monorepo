import axios from 'axios';
import { IGetUsersResult } from 'types';
import { ktClient } from '../client';

type Params = {
  ids?: number[] | number,
  codes?: string[] | string,
};

const dataSize = 100;

/**
 * Get kintone users by ids.
 * https://kintone.dev/en/docs/common/user-api/users/get-users/
 *
 * @param obj if not defined, will retrieve all users
 * @returns {Promise<IGetUsersResult>} user api's return type
 */
export const getUsers = async (params?: Params) => {
  const { codes, ids } = params || {};
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
        size: dataSize,
      },
      headers: {
        'X-Cybozu-Authorization': auth,
      },
    });

    if (status === 200) {

      // idとcode指定なしで全ユーザーを取得する場合
      let usersData = data.users as IGetUsersResult['users'];
      if (!ids && !codes) {
        for (let i = 1; i < 10; i++) {

          const ofs = dataSize * i;
          const {
            status: ofsStatus,
            data: ofsData,
          } = await axios({
            url: endpoint,
            method: 'get',
            data: {
              size: dataSize,
              offset: ofs,
            },
            headers: {
              'X-Cybozu-Authorization': auth,
            },
          });


          if (ofsStatus === 200) {
            usersData = usersData.concat(ofsData.users);
            if (ofsData.users.length < 100) break;
          } else {
            throw new Error(`Request for offset failed. status: ${status} ${ofsData}`);
          }
        }
      }

      usersData = usersData.filter(({ valid }) => valid === true);

      return usersData as IGetUsersResult['users'];
    } else {
      throw new Error(`Request failed. status: ${status} ${data}`);
    }

  } catch (err: any) {
    throw new Error(`getUsers: ${err?.response?.data?.message}`);
  }
};
