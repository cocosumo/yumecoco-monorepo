import { produce } from 'immer';
import { GetMyOrders, GetMyOrdersResponse } from '../types';
import { getMyOrders } from './getMyOrders';



interface GetAllAndpadOrders {
  afterContractOnly: boolean,
  offset?: number,
  cumm?: GetMyOrdersResponse,
}

export const getAllOrdersAfterContract = async (options?: GetAllAndpadOrders): Promise<GetMyOrdersResponse> => {

  const {
    afterContractOnly = true,
    offset = 0,
    cumm,
  } = options || {};


  const params: GetMyOrders = {
    limit: 100,
    q: afterContractOnly ? '案件フロー in (進行中, 完工（精算前）, 精算完了, 失注)' : '',
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
    return getAllOrdersAfterContract({
      afterContractOnly,
      offset: newObjects.length,
      cumm: newData,
    });
  }
};
