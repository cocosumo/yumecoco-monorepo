import { SaveProjectData } from 'api-andpad';
import { baseUrl } from 'kokoas-client/src/config/settings';
import { kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const saveAndpadProject = async (projId: string) => {

  const apiRoot : ApiNodes = 'kokoas';
  const endpoint = [
    baseUrl,
    apiRoot,
    kokoasEndpoints.saveProjectToAndpad,
    projId,
  ].join('/');


  const result = await kintone.proxy(
    `${endpoint}`,
    'POST',
    {},
    {
      projId,
    });
  const [body, status] = result;

  if (status === 200) {
    console.log(body);
    return body as SaveProjectData;
  } else {
    throw new Error(result);
  }

} ;