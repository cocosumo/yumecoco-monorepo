import { produce } from 'immer';
import { GetMyOrders, GetMyOrdersResponse } from '../types';
import { getMyOrders } from './getMyOrders';



interface GetAllAndpadOrders {
  beforeInvoiceIssue?: boolean,
  offset?: number,
  cumm?: GetMyOrdersResponse,
  q?: string,
}

export const getAllAndpadOrders = async (options?: GetAllAndpadOrders): Promise<GetMyOrdersResponse> => {

  const {
    beforeInvoiceIssue,
    offset = 0,
    cumm,
    q,
  } = options || {};

  const queryArr: string[] = [];

  if (beforeInvoiceIssue) {
    queryArr.push('案件フロー in (契約前,着工前,進行中,完工（精算前）)' );
  }

  if (q) {
    queryArr.push(q);
  }

  const queryStr = queryArr.join(' AND ');

  console.log(queryStr);

  const params: GetMyOrders = {
    limit: 100,
    q: queryStr,
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
      q,
    });
  }
};
