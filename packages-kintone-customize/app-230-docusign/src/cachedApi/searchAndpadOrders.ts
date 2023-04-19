import {  getMyOrdersResponse } from 'api-andpad';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import qs from 'qs';
import { serverlUrl } from '../../config';

export const searchAndpadOrders = async (searchStr?: string) => {

  const endpoint = [
    serverlUrl,
    'kokoas',
    kokoasEndpoints.getProjectsFromAndpad,
  ].join('/');

  const searchFields = [
    'システムID =',
    //'案件名 LIKE',
  ];

  const query = searchFields
    .map((key) => `${key} ${searchStr}`)
    .join(' OR ');

  const url = `${endpoint}?${qs.stringify(searchStr ? { q: query } : {})}`;

  const result = await kintoneProxyWrapper({
    url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
    
  });
  const { data } = result;

  return getMyOrdersResponse.parse(data);


};