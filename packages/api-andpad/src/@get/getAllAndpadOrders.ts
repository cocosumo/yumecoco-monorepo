import { produce } from 'immer';
import { GetMyOrders, GetMyOrdersResponse } from '../types';
import { getMyOrders } from './getMyOrders';



interface GetAllAndpadOrders {
  beforeInvoiceIssue: boolean,
  offset?: number,
  cumm?: GetMyOrdersResponse,
}

export const getAllAndpadOrders = async (options?: GetAllAndpadOrders): Promise<GetMyOrdersResponse> => {

  const {
    beforeInvoiceIssue = true,
    offset = 0,
    cumm,
  } = options || {};


  const params: GetMyOrders = {
    limit: 100,
    q: beforeInvoiceIssue ? '案件フロー in (契約前,着工前,進行中,完工（精算前）)' : '',
    series: ['案件フロー'],
    offset: offset,
  };

  const result = await getMyOrders(params) || {};

  const newObjects = [
    ...cumm?.data.objects ?? [],
    ...result.data.objects,
  ];

  const newData = produce(result, draft => {
    draft.data.objects = newObjects;
  });

  if (result.data.last_flg) {
    return newData;
  } else {
    return getAllAndpadOrders({
      beforeInvoiceIssue,
      offset: newObjects.length,
      cumm: newData,
    });
  }
};
