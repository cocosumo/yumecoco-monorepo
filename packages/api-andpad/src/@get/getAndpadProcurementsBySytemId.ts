import { getAndpadCookies } from 'api-aws/src/s3/getAndpadCookie';
import axios, { AxiosHeaders } from 'axios';



export const getAndpadProcurementsBySytemId = async (systemId: string | number) => {
  
  const cookies = getAndpadCookies();

  const result = await axios({
    method: 'GET',
    url: `https://andpad.jp/manager/my/orders/${systemId}/contract_orders`,
    withCredentials: true,
    headers: {
      'Cookie': cookies,
    } as unknown as AxiosHeaders,
  });

  if (result.data.includes('ログインしてください')) {
    throw new Error('ログインしてください');
  }
  
  return result;
};