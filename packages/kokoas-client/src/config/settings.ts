
import { isProd } from 'config';
import { ApiNodes } from 'types';

  
export const baseUrl = isProd ? process.env.BASE_URL : process.env.LOCAL_URL;

const kokoasApiRoot : ApiNodes = 'kokoas';

export const kokoasAPIBaseUrl = `${baseUrl}/${kokoasApiRoot}`; 
