import axios, { AxiosError } from 'axios';
import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import { AddMembersResult201, addMembersResult201, addMembersResult207 } from 'types';
import { sendMessage } from 'api-chatwork';
import { ZodError } from 'zod';
import { chatworkRooms } from 'config';

interface BodySchema {
  /** 案件管理ID利用フラグ。trueを指定した場合、パスのorder_idを案件管理IDとして扱う */
  use_order_common_id?: boolean,

  /** 案件メンバー追加が成功したユーザに案件招待のお知らせを送るかどうか。 */
  send_notification?: boolean,

  /** emailもありますが、今回はcommon_id (社員名簿のuuid) のみに固定します。 */
  identification_type: 'common_id' 

  members : Array<{
    key: string // 社員番号
    role: 'admin'
    job_names?: string[]
  }>

} 

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

    const body : BodySchema =  {
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
        await sendMessage({
          body: `ANDPADの案件メンバーの追加APIは変更仕様があるかもしれません。${JSON.stringify(data)}`,
          roomId: chatworkRooms.test,
        }).catch();
        return data as AddMembersResult201;
      }
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