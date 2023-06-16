import { GetMyOrders, GetMyOrdersResponse } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'config';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import qs from 'qs';
 
export const searchAndpad = async (query: GetMyOrders) => {
  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectsFromAndpad,
  ].join('/');
  
  const endpointWithQuery = `${endpoint}?${qs.stringify(query)}`;

  const result = await kintoneProxyWrapper({
    url: endpointWithQuery,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  const { data } = result;

  return data as GetMyOrdersResponse;


};