import { getMyOrdersResponse } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';

export const searchAndpadOrders = async () => {

  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectsFromAndpad,
  ].join('/');

  console.log(endpoint);

  const result = await kintoneProxyWrapper({
    url: `${endpoint}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  const { data } = result;

  return getMyOrdersResponse.parse(data);


};