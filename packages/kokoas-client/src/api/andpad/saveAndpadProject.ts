import { SaveProjectData, SaveProjectResponse } from 'api-andpad';
import { baseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const saveAndpadProject = async (data: SaveProjectData) => {

  const apiRoot : ApiNodes = 'kokoas';
  const endpoint = [
    baseUrl,
    apiRoot,
    kokoasEndpoints.saveProjectToAndpad,
  ].join('/');


  const result = await kintone.proxy(
    `${endpoint}`,
    'POST',
    {},
    data,
  );
  const [body, status] = result;

  if (status === 200) {
    return body as SaveProjectResponse;
  } else {
    throw new Error(result);
  }

} ;