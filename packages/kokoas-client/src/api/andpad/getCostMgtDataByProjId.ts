import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import type { GetCostMgtData } from 'types';

export const getCostMgtDataByProjId = async (projId: string) => {

  try {
    if (!projId) return null;
  
    const endpoint = [
      kokoasAPIBaseUrl,
      kokoasEndpoints.getCostMgtDataByProjIdV2,
      projId,
    ].join('/');


    const result = await kintoneProxyWrapper({
      url: `${endpoint}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: {},
    });
    const { data } = result;

    return data as GetCostMgtData | null;

  } catch (err) {
    console.warn(err);
    return null;
  }
};