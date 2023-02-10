import axios, { AxiosError } from 'axios';
import { getToken } from '../@auth/andpadClient';
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

    const resp = saveProjectResponse.parse(data);

    return resp;

  } catch (err: unknown) {
    const {
      response,
      message,
    } = err as AxiosError & Error;
    console.error(response?.data?.errors);
    throw new Error(`saveProject が失敗しました. ${message} ${response?.data?.errors}`);
  }
};