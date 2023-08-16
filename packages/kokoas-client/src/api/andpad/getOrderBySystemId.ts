import { GetOrderBySystemIdParams } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import { TAndpadOrderResult, andpadOrderSchema } from 'types/src/common/andpad.order';
import qs from 'qs';

export const getOrderBySystemId = async (params: GetOrderBySystemIdParams) => {

  const {
    systemId,
  } = params;

  console.log('getOrderBySystemId', params);
  if (!systemId) return null;
  
  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectFromAndpadBySystemId,
  ].join('/');

  const query = qs.stringify(
    params, 
    {
      arrayFormat: 'comma',
    },
  );

  const result = await kintoneProxyWrapper({
    url: `${endpoint}?${query}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const { data } = result;

  const parsed = andpadOrderSchema.safeParse(data);

  if (!parsed.success) {
    
    return data as TAndpadOrderResult;
  } 

  return parsed.data;

};