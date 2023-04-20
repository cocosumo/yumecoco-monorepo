import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import { serverlUrl } from '../../config';
import { GetMyOrders, GetMyOrdersResponse } from 'api-andpad';
import qs from 'qs';
import produce from 'immer';


interface GetAllAndpadOrders {
  beforeContractOnly: boolean,
  offset?: number,
  cumm?: GetMyOrdersResponse,
}

/** 
 * 再起的に全ての案件を取得する
 * 全て取得すると、時間がかかるので、beforeContractOnlyで渋る
 * 
 * @param options
 * @returns {GeyMyOrdersResponseProject}  
 * */
export const getAllAndpadOrders = async (options?: GetAllAndpadOrders): Promise<GetMyOrdersResponse> => {
  const {
    beforeContractOnly = true,
    offset = 0,
    cumm,
  } = options || {};

  const endpoint = [
    serverlUrl,
    'kokoas',
    kokoasEndpoints.getProjectsFromAndpad,
  ].join('/');

  const params: GetMyOrders = {
    limit: 100,
    q: beforeContractOnly ? '案件フロー in (契約前, 着工前)' : '',
    series: ['案件フロー'],
    offset: offset,
  };

  const endpointWithParams = `${endpoint}?${qs.stringify(params)}`;

  console.log(offset);

  const result = await kintoneProxyWrapper({
    url: endpointWithParams,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  const { data } = result as { data: GetMyOrdersResponse };

  const newObjects = [
    ...cumm?.data.objects ?? [],
    ...data.data.objects,
  ];

  const newData = produce(data, draft => {
    draft.data.objects = newObjects;
  });

  if (data.data.last_flg) {
    return newData;
  } else {
    return getAllAndpadOrders({ 
      beforeContractOnly, 
      offset: newObjects.length, 
      cumm: newData, 
    });
  }


};