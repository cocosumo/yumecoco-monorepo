import { getContractById, getCustGroupById, getProjById } from 'api-kintone';
import { getAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';


export const getContractReportData = async (contractId: string) => {
  const record = await getContractById(contractId);

  const {
    uuid,
    projId,
    totalContractAmt,
    projName,
    contractDate,
    deliveryDate,

    contractAmt,
    contractAmtDate,
    
    initialAmt,
    initialAmtDate,

    interimAmt,
    interimAmtDate,

    finalAmt,
    finalAmtDate,
  } = record;

  const {
    agents,
    custGroupId,
    projTypeName,
  } = await getProjById(projId.value);


  const {
    storeName,
    members,
  } = await getCustGroupById(custGroupId.value);


  const cocoAGNames = getAgentNamesByType(agents, 'cocoAG');
  const yumeAGNames = getAgentNamesByType(agents, 'yumeAG');

  const custNames = members.value.map(({ value:{ customerName } }) => customerName.value).join('、');

  return {
    contractId: uuid.value,
    totalContractAmt: +totalContractAmt.value,
    projName: projName.value,
    cocoAGNames,
    yumeAGNames,
    custNames,
    contractDate: contractDate.value,
    deliveryDate: deliveryDate.value,
    storeName: storeName.value,
    projTypeName: projTypeName.value,
    
    contractAmt: +contractAmt.value,
    contractAmtDate: contractAmtDate.value,

    initialAmt: +initialAmt.value,
    initialDate: initialAmtDate.value,

    interimAmt: +interimAmt.value,
    interimDate: interimAmtDate.value,

    finalAmt: +finalAmt.value,
    finalAmtDate: finalAmtDate.value,
    
  };
};

export type ContractReportData = Awaited<ReturnType<typeof getContractReportData>>;