import { SaveProjectParams, saveProjectResponse } from 'api-andpad';
import { baseUrl } from 'kokoas-client/src/config/settings';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import { ApiNodes } from 'types';

export const saveAndpadProject = async (data: SaveProjectParams) => {

  const apiRoot : ApiNodes = 'kokoas';
  const endpoint = [
    baseUrl,
    apiRoot,
    kokoasEndpoints.saveProjectToAndpad,
  ].join('/');

  const result = await kintoneProxyWrapper({
    url: `${endpoint}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });


  return saveProjectResponse.parse(result.data);

};