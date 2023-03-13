import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';

export const convertToAndpadByEstId = async (estimateId: string | undefined) => {

  if (!estimateId) throw new Error('見積もりIDが提供されていません');
  
  
  const endpoint = `${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpad}/${estimateId}`;

  const result = await kintone.proxy(endpoint, 'GET', {}, {});
  
  const [body, status] = result;

  if (status === 200 && typeof body === 'string') {
    return body;
  } else {
    throw new Error(result);
  }

};