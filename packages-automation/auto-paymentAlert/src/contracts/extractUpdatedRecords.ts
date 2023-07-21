import { getContractsByUpdateDate } from 'api-kintone';



export const extractUpdatedRecords = async () => {
  const tgtContracts = (await getContractsByUpdateDate(1, 'DAYS'))
  .filter((res) => res.);
};