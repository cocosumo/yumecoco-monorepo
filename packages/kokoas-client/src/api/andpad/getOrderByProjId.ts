import { saveProjectData } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';

export const getOrderById = async (projId: string) => {

  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectFromAndpadByProjId,
    projId,
  ].join('/');

  const result = await kintoneProxyWrapper({
    url: `${endpoint}`,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    data: {},
  });
  const { data, status } = result;

  if (status === 200) {
    return saveProjectData.parse(data);
  } else {
    throw new Error('Andpadから案件データを取得できませんでした。');
  }

};