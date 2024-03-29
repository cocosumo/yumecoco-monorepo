import { SaveProjectParams, saveProjectResponse } from 'api-andpad';
import { baseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const saveAndpadProject = async (data: SaveProjectParams) => {

  const apiRoot : ApiNodes = 'kokoas';
  const endpoint = [
    baseUrl,
    apiRoot,
    kokoasEndpoints.saveProjectToAndpad,
  ].join('/');

  const result = await kintone.proxy(
    `${endpoint}`,
    'POST',
    {
      'Content-Type': 'application/json',
    },
    data,
  );
  const [body, status] = result;

  if (status === 200) {
    return saveProjectResponse.parse(JSON.parse(body));
  } else {
    throw new Error(result);
  }

};