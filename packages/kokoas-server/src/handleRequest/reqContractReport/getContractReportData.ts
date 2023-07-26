import { getContractById, getProjById } from 'api-kintone';


export const getContractReportData = async (contractId: string) => {
  const record = await getContractById(contractId);

  const {
    uuid,
    projId,
    totalContractAmt,
    projName,
  } = record;

  const {

  } = await getProjById(projId.value)

  return {
    contractId: uuid.value,
    totalContractAmt: +totalContractAmt.value,
    projName: projName.value,
  };
};

export type ContractReportData = Awaited<ReturnType<typeof getContractReportData>>;