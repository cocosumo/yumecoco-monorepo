import { saveProjectData } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';

export const getOrderByProjId = async (projId: string) => {

  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectFromAndpadByProjId,
    projId,
  ].join('/');

  const result = await kintoneProxyWrapper({
    url: `${endpoint}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  const { data } = result;

  return saveProjectData.parse(data);


};