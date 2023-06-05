// ここでSDK無し外部APIのbaseURLを管理するかどうか検討中。

import { ApiNodes } from 'types';
import { isProd } from './isProd';

export const baseUrl = isProd ? process.env.BASE_URL : process.env.LOCAL_URL;

const kokoasApiRoot : ApiNodes = 'kokoas';

export const kokoasAPIBaseUrl = `${baseUrl}/${kokoasApiRoot}`; 