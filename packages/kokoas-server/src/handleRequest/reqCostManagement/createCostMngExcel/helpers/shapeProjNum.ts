import { getStoreByStoreCode } from 'api-kintone';

export const shapeProjNum = async (projNum: string) => {
  const storeCode = projNum.split('-');
  const storeData = await getStoreByStoreCode(storeCode[0]);

  return `${storeData.storeNameShort.value} ${storeCode[1]}`;
};
