import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';

export const useContractProjPlanByProjId = (projId: string, enabled = true) => {
  const {
    data: contracts,
    ...others
  } = useContractsByProjIdV2(projId, enabled);

  return {
    data: contracts?.find((contract) => contract.contractType.value === '設計契約'),
    ...others,
  };

};