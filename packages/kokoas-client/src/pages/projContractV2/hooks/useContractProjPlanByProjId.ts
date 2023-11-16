import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';

export const useContractProjPlanByProjId = ({
  projId,
  contractId,
  enabled = true,
}:{
  projId: string,

  /** 契約ID。空だと、新規としてみなす */
  contractId: string, 
  enabled?: boolean,
}) => {
  const {
    data: contracts,
    ...others
  } = useContractsByProjIdV2(projId, enabled);

  return {
    data: contracts
      ?.find((contract) => contract.contractType.value === '設計契約' 
        && (
          !contractId || contract.uuid.value !== contractId 
        )),
    ...others,
  };

};