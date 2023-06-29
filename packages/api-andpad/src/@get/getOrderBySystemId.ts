import axios from 'axios';

import { getToken } from '../@auth/andpadClient';
import { endpoints } from '../endpoints';
import qs from 'qs';
import { KAndpadOrderResult } from 'types/src/common/andpad.order';


/**
 * ココアスの工事番号でAnpad案件情報を取得する
 * @param projId 
 */


export const getOrderBySystemId = async ({
  systemId,
  series,
}: GetOrderBySystemIdParams) => {
  if (!systemId) return;

  const query = qs.stringify({
    series,
  }, {
    arrayFormat: 'comma',
  });

  const url = `${endpoints.ourOrders}/${systemId}?${query}`;

  const { data } = await axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  return data; 
};

export interface GetOrderBySystemIdParams {
  systemId: string;
  series?: KAndpadOrderResult[];
}