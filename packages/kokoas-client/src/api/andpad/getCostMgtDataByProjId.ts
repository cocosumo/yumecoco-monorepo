import { saveProjectData } from 'api-andpad';
import { GetCostManagement } from 'api-kintone';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';

export const getCostMgtDataByProjId = async (projId: string) => {

  try {
    if (!projId) return null;
  
    const endpoint = [
      kokoasAPIBaseUrl,
      kokoasEndpoints.getCostMgtDataByProjId,
      projId,
    ].join('/');

    const result = await kintoneProxyWrapper({
      url: `${endpoint}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      data: {},
    });
    const { data } = result;

    const parsed = saveProjectData.safeParse(data);

    if (!parsed.success) {
    
      return data as GetCostManagement | null;
    } 

    return parsed.data;
  } catch (err) {
    console.warn(err);
    return null;
  }
};