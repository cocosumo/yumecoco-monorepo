import axios, { AxiosHeaders } from 'axios';
import UserAgent from 'user-agents';
import { getAndpadCookies } from './getAndpadCookie';
import { AndpadBudgetResult } from 'types/src/common/andpad.order.budget';
import { AndpadProcurementResult } from 'types/src/common/andpad.order.procurement';

const fetchAndpadProcBySysId = async (
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

  // get value of gon.contract_orders until ; from the html inside the script tag
  const data = result.data.match(/gon.contract_orders=(.*?);/)?.[1];

  if (!data) {
    console.error('No data');
    return [];
  }

  // parse the data
  console.log('data', JSON.parse(data));

  return JSON.parse(data);
};

/** 実行予算のデータ */
const fetchAndpadBudgetBySysId = async (systemId: string | number, passedCookies: string) => {
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
};


/** 原価管理表に必要なデータをAndpadからまとめて取得 */
export const getAndpadProcurementsBySytemId = async (systemId: string | number) => {
  const cookies = await getAndpadCookies();
  console.log('cookies', cookies);

  const fetchData = async (retryCount = 0) : Promise<{
    procurements: AndpadProcurementResult;
    andpadBudget: AndpadBudgetResult;
  }> => {
    try {
      const [
        procurements,
        andpadBudget,
      ] = await Promise.all([
        fetchAndpadProcBySysId(systemId, cookies),
        fetchAndpadBudgetBySysId(systemId, cookies),
      ]);

      return {
        procurements: procurements,
        andpadBudget: andpadBudget,
      };
    } catch (err) {
      if (retryCount >= 1) {
        throw err; // If already retried once, throw the error
      }
      return await fetchData(retryCount + 1); // Retry once
    }
  };
  

  return fetchData();
};