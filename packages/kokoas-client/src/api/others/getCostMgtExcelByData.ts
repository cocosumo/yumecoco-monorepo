import { kokoasAPIBaseUrl } from 'config';
import { kintoneProxyWrapper, kokoasEndpoints } from 'libs';
import type { GetCostMgtData, GetCostMgtExcelByDataResult } from 'types';

export const getCostMgtExcelByData = async (data: GetCostMgtData) => {

  try {

    console.log('getCostMgtExcelByData', data);

    const endpoint = [
      kokoasAPIBaseUrl,
      kokoasEndpoints.getCostMgtExcelByData,
    ].join('/');

    const result = await kintoneProxyWrapper({
      url: `${endpoint}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: data,
    });

    return result.data as GetCostMgtExcelByDataResult;
  } catch (e) {
    throw new Error(e);
  }

};