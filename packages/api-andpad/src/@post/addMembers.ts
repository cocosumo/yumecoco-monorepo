import axios, { AxiosError } from 'axios';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { AddMembersResult201, addMembersResult201, addMembersResult207 } from 'types';
import { ZodError } from 'zod';
import { ReqAddMembersBody } from '../types';
import { notifyAdmin } from 'libs/src/notifyAdmin';


/**
 * 自社案件への案件メンバー一括登録
 * 
 * @param param
 * @param param.systemId 自社案件ID
 * @param param.members 社員番号の配列 (Kintone上の社員名簿)
 */
export const addMembers = async ({
  systemId,
  members,
  sendNotification = true,
} : {
  systemId: string,
  members: string[],
  sendNotification?: boolean,
}) => {
  try {

    const body : ReqAddMembersBody =  {
      identification_type: 'common_id',
      send_notification: sendNotification,
      members: members.map((member) => ({
        key: member,
        role: 'admin',
      })),
    };

    const { data, status } = await axios({
      url: endpoints.addMembers(systemId),
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
      data: body,
    });

    console.log('addMembersの結果', JSON.stringify(data, null, 2), status);

    try {

      if (status === 201) {
        return addMembersResult201.parse(data);
      } else if (status === 207) {
        return addMembersResult207.parse(data);
      } else {
        return data as AddMembersResult201;
      }
    } catch (err) {
      if (err instanceof ZodError) {
        await notifyAdmin(`ANDPADの自社案件の案件メンバー一括登録APIのレスポンスのスキーマが変更されています。${err.message} ${JSON.stringify(data)}`);
      }
      return data as AddMembersResult201;

    }

  } catch (err) {
    console.error(err);

    if (err instanceof AxiosError) {
      const { response } = err;
      if (response) {
        const { status } = response;
        throw new Error(`案件メンバーの追加に失敗しました。管理者に連絡してください。${status} ${err.message}`);
      }
    }
  }
  
};