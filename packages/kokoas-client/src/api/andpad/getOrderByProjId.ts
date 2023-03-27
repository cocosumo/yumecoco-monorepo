import { saveProjectData } from 'api-andpad';
import { kokoasAPIBaseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';

export const getOrderById = async (projId: string) => {

  const endpoint = [
    kokoasAPIBaseUrl,
    kokoasEndpoints.getProjectFromAndpadByProjId,
    projId,
  ].join('/');

  const result = await kintone.proxy(
    `${endpoint}`,
    'GET',
    {
      'Content-Type': 'application/json',
    },
    {},
  );
  const [body, status] = result;

  if (status === 200) {
    return saveProjectData.parse(JSON.parse(body));
  } else {
    throw new Error(result);
  }

};