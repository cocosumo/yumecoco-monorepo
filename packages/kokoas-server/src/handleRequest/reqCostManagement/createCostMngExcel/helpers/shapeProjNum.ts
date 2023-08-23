import { getStoreByStoreCode } from 'api-kintone';

export const shapeProjNum = async (projNum: string) => {
  const storeCode = projNum.split('-');
  const storeData = await getStoreByStoreCode(storeCode[0]);

  console.log('途中経過:: ', storeCode);

  return `${storeData.storeNameShort.value} ${storeCode[1]}`;
};
