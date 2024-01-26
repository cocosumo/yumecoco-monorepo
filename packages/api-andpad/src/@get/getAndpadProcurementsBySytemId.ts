import axios, { AxiosHeaders } from 'axios';
import UserAgent from 'user-agents';
import { getAndpadCookies } from './getAndpadCookie';
import { AndpadBudgetResult } from 'types/src/common/andpad.order.budget';
import { AndpadProcurementResult } from 'types/src/common/andpad.order.procurement';
import { getAndpadCookieSession } from './getAndpadCookieSession';

export const fetchAndpadProcBySysId = async (
  systemId: string | number, 
  passedCookies: string,
): Promise<AndpadProcurementResult> => {
  const result = await axios({
    method: 'GET',
    url: `https://andpad.jp/manager/my/orders/${systemId}/contract_orders?pp=1000`,
    withCredentials: true,
    headers: {
      'Cookie': passedCookies,
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': new UserAgent().toString(),
    } as unknown as AxiosHeaders,
  });

  
  if (result.data.includes('ログインしてください')) {
    throw new Error('ログインしてください');
  }

  // get value of gon.contract_orders until ; from the raw html
  const data = result.data.match(/gon.contract_orders=(.*?);/)?.[1];

  if (!data) {
    console.error('No data');
    return [];
  }

  return JSON.parse(data);
};

/** 実行予算のデータ */
export const fetchAndpadBudgetBySysId = async (systemId: string | number, passedCookies: string) => {

  try {

    const result = await axios({
      method: 'GET',
      url: `https://api.andpad.jp/manager/v2/orders/${systemId}/planned_budget/planned_budget_groups`,
      withCredentials: true,
      headers: {
        'Cookie': passedCookies,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json', // Without this, the request returns error 500
        'User-Agent': new UserAgent().toString(),
      } as unknown as AxiosHeaders,
    });

    return result.data as AndpadBudgetResult;

  } catch (err: any) {
    if (err.response.status === 401) {
      throw new Error('fetchAndpadBudgetBySysId ログインしてください');
    } 
    return null;
  }

};


/** 原価管理表に必要なデータをAndpadからまとめて取得 */
export const getAndpadProcurementsBySytemId = async (systemId: string | number) => {
  const cookies = await getAndpadCookies();
  console.log('cookies', cookies);

  const fetchData = async (retryCount = 0, passedCookies = '') : Promise<{
    procurements: AndpadProcurementResult;
    andpadBudget: AndpadBudgetResult | null;
  }> => {
    console.log(`Using ${passedCookies ? 'new' : 'old'} cookies.`);
    const cookieToUse = passedCookies || cookies;

    try {
      const [
        procurements,
        andpadBudget,
      ] = await Promise.all([
        fetchAndpadProcBySysId(systemId, cookieToUse),
        fetchAndpadBudgetBySysId(systemId, cookieToUse),
      ]);

      return {
        procurements: procurements,
        andpadBudget: andpadBudget,
      };
    } catch (err) {
      if (retryCount >= 1) {
        throw new Error('Retry failed getAndpadProcurementsBySytemId');
      }
      const newCookies = await getAndpadCookieSession();

      return await fetchData(retryCount + 1, newCookies); // Retry once
    }
  };
  

  return fetchData();
};

export type GetAndpadProcurementsBySytemIdReturn = Awaited<ReturnType<typeof getAndpadProcurementsBySytemId>>; 