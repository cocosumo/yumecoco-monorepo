import { GetMyOrders, getMyOrdersResponse } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import qs from 'qs';

export const searchAndpadOrders = async (params?: GetMyOrders) => {

  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectsFromAndpad,
  ].join('/');

  const url = `${endpoint}?${qs.stringify(params)}`;

  console.log(url);

  const result = await kintoneProxyWrapper({
    url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
    
  });
  const { data } = result;

  return getMyOrdersResponse.parse(data);


};