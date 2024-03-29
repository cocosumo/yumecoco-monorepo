
import { isProd } from 'config';
import { ApiNodes } from 'types';

  
export const baseUrl = isProd ? process.env.BASE_URL : process.env.LOCAL_URL;

export const isStaging = (typeof kintone !== 'undefined') ? kintone?.app.getId() === 177 : false;

export const isShowDev = !isProd || isStaging;

const kokoasApiRoot : ApiNodes = 'kokoas';

export const kokoasAPIBaseUrl = `${baseUrl}/${kokoasApiRoot}`; 
