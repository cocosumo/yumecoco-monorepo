import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { getToken } from '../@auth/andpadClient';
import { getMyOrders } from '../@get';
import { endpoints } from '../endpoints';
import { saveProjectData, SaveProjectData, saveProjectResponse } from '../types';

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
export const saveProject = async (body: SaveProjectData) => {

  try {
    const parsedBody = saveProjectData.parse(body);

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


    console.log('保存した内容は全て格納出来たか確認処理中…');
    const saveData = await getMyOrders({
      q: `案件管理ID = ${案件管理ID}`,
      series: Object.keys(parsedBody) as (keyof SaveProjectData)[],
    });

    const savedAndpadData = saveData.data.objects?.[0];

    console.log('格納されたデータ', savedAndpadData);

    for (const dataKey of Object.keys(parsedBody)) {
      if (parsedBody[dataKey] !== savedAndpadData[dataKey]) {
        console.log();
        throw new Error(`{ ${dataKey}: ${parsedBody[dataKey]} } 保存が失敗しました。ANDPADに格納した情報：${savedAndpadData[dataKey]}。 管理者に連絡してください。`);
      }
    }

    console.log('保存が、成功しました。');
    return resp;

  } catch (err: unknown) {
    const {
      response,
      errors,
      message,
    } = err as AxiosError & ZodError;
    const errorMsg = `saveProject が失敗しました. COCOAS_ERROR: ${JSON.stringify(errors)}, ANDPAD_ERROR: ${response?.data?.errors ?? ''}, ${message}。`;

    throw new Error(errorMsg);
  }
};