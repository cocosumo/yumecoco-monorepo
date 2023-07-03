// ここでSDK無し外部APIのbaseURLを管理するかどうか検討中。

import { ApiNodes } from 'types';
import { isProd } from './isProd';

export const baseUrl = isProd ? process.env.BASE_URL : process.env.LOCAL_URL;

const kokoasApiRoot : ApiNodes = 'kokoas';

export const kokoasAPIBaseUrl = `${baseUrl}/${kokoasApiRoot}`; 

export const andpadURL = 'https://work.andpad.jp/';
export const loginURL = 'https://andpad.jp/login';
export const andpaPaymentListURL = 'https://andpad.jp/manager/our/box_in/customer_agreement_payments';
export const chatWorkLink = process.env.CW_CHATWORK_TICKET;
