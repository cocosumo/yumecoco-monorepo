import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { getMyOrders } from '../@get';
import { endpoints } from '../endpoints';
import { saveProjectData, SaveProjectData, SaveProjectParams, saveProjectResponse } from '../types';
import { addDelMembers } from '../@custom';

/**
 *
 * 現在の仕様のANDPADの仕様：
 *
 * - 保存の場合と更新の場合、必須項目が異なります。
 * 今見た限り、当社で指定したラベルの必須設定によって、保存際に必須です。
 * 更新の際は任意になっています。
 * ココアス上、更新の時も必須にします。　~ ras 2023.02.10
 *
 * - リストにないものを指定しても、リクエストが通ります。もちろん、ANDPADでは表示されない。
 * よって、ココアスのサーバ側で検証し、エラーを出す。
 */
export const saveProject = async (body: SaveProjectParams) => {
  const {
    projData,
    members,
  } = body;

  console.log('saveProject received', body);

  try {
    const parsedBody = saveProjectData.parse(projData);

    const { data } = await axios({
      url: endpoints.ordersSync,
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getToken()}`,
      },
      data: parsedBody,
    });

    const resp = saveProjectResponse.parse(data); // ANDPAD側が安定した型で返ったかチェック
    const {
      data: {
        object: {
          案件管理ID,
        },
      },
    } = resp;

    console.log('メンバー', members);
   


    const savedData = await getMyOrders({
      q: `案件管理ID = ${案件管理ID}`,
      series: Object.keys(parsedBody) as (keyof SaveProjectData)[],
    });

    const {
      システムID: systemId,
    } = savedData.data.objects[0];

    if (systemId) {
      const result = await addDelMembers({
        systemId: systemId.toString(),
        members: members.filter(Boolean), // remove empty items
      });

      console.log('メンバー追加の結果', result);
    } 
  
    const savedAndpadData = savedData.data.objects?.[0];

    console.log('格納されたデータです', savedAndpadData);

    /*  for (const dataKey of Object.keys(parsedBody)) {
      const dataValue = parsedBody[dataKey as keyof typeof parsedBody];
      const savedValue = savedAndpadData[dataKey as keyof typeof savedAndpadData];
      if (
        !!dataValue !== !!savedValue // 両方ともtrueかfalseか
        &&  dataValue !== savedValue // 両方とも同じ値か
      ) {
        throw new Error(`{ ${dataKey}: ${dataValue} } 保存が失敗しました。ANDPADに格納した情報：${savedValue}。 管理者に連絡してください。`);
      }
    } */

    console.log('保存が成功しました。');
    return resp;

  } catch (err: unknown) {
    const {
      response,
      errors,
      message,
    } = (err || {}) as AxiosError & ZodError;
    const errorMsg = `saveProject が失敗しました. COCOAS_ERROR: ${JSON.stringify(errors)}, ANDPAD_ERROR: ${JSON.stringify(response?.data ?? '')}, ${message}。`;

    throw new Error(errorMsg);
  }
};