import axios, { AxiosError } from 'axios';
import { ReqDelMembersBody } from '../types';
import { endpoints } from '../endpoints';
import { getToken } from '../@auth/andpadClient';
import { DelMembersResult201, delMembersResult201, delMembersResult207 } from 'types';
import { ZodError } from 'zod';

import { notifyAdmin } from 'libs/src/notifyAdmin';

export const deleteMembers = async ({
  systemId,
  members,
  idType = 'common_id',
} : {
  systemId: string,
  members: string[],
  idType?: 'common_id' | 'email',
}) => {

  try {

    const body : ReqDelMembersBody = {
      identification_type: idType,
      members: members.map((member) => ({
        key: member,
      })),
    };
    const { data, status } = await axios({
      url: endpoints.deleteMembers(systemId),
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
      data: body,
    });

    try {

      if (status === 200) {
        return delMembersResult201.parse(data);
      } else if (status === 207) {
        return delMembersResult207.parse(data);
      } else {
        return data as DelMembersResult201;
      }
    } catch (err) {
      if (err instanceof ZodError) {
        await notifyAdmin(`Andpad側で自社案件の案件メンバー一括削除APIのレスポンスの仕様が変更されています。${err.message} ${JSON.stringify(data)}`);
      }
      return data as DelMembersResult201;
    }

  } catch (err) {
    let errMessage = '案件メンバーの追加に失敗しました。管理者に連絡してください';
    if (err instanceof AxiosError) {
      const { response } = err;
      if (response) {
        const { status } = response;
        errMessage = `案件メンバーの追加に失敗しました。管理者に連絡してください。${status} ${err.message}`;
      }
    }

    throw new Error(errMessage);
  }
  
};