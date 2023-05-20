import axios, { AxiosError } from 'axios';
import { endpoints } from '../endpoints';
import { ReqUpdateMembersBody } from '../types';
import { getToken } from '../@auth/andpadClient';
import { UpdateMembersResult200, updateMembersResult200, updateMembersResult207 } from 'types';
import { ZodError } from 'zod';
import { notifyAdmin } from 'libs/src/notifyAdmin';

/** 自社案件の案件メンバー情報一括更新 */
export const updateMembers = async ({
  systemId,
  members,
  idType = 'common_id',
}: {
  systemId: string,
  members: string[],
  idType?: 'common_id' | 'email',
}) => {

  try {
    const body : ReqUpdateMembersBody = {
      identification_type: idType,
      members: members.map((member) => ({
        key: member,
        role: 'admin',
      })),
    };

    const { data, status } = await axios({
      url: endpoints.updateMembers(systemId),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
    
      }, 
      data: body, 
    });

    console.log('updateMembersの結果', JSON.stringify(data, null, 2), status);


    try {
      if (status === 200) {
        return updateMembersResult200.parse(data);
      } else if (status === 207) {
        return updateMembersResult207.parse(data);
      } 

    } catch (err) {
      if (err instanceof ZodError) {
        await notifyAdmin(`Andpad側で自社案件の案件メンバー情報一括更新APIのレスポンスの仕様が変更されています。${err.message} ${JSON.stringify(data)}`);
      }
    }

    return data as UpdateMembersResult200;

  } catch (err) {
    let errMessage = '自社案件の案件メンバー情報一括更新。管理者に連絡してください';
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
  


  
