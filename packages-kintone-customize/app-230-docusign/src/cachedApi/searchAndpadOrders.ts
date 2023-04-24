import {  GetMyOrders, GetMyOrdersResponse } from 'api-andpad';
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
    `案件名 LIKE ${searchStr}`,
    '案件フロー in (着工前, 契約前)',
  ];

  const query = searchFields
    .join(' AND ');

  const params : GetMyOrders = {
    q: query,
    series: ['案件フロー'],
  };

  const url = `${endpoint}?${qs.stringify(params)}`;

  const result = await kintoneProxyWrapper({
    url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    data: {},
    
  });
  const { data } = result;

  return data as GetMyOrdersResponse;


};