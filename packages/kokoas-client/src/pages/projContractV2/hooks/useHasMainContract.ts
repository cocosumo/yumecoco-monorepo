import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedRHF';

/**
 * 工事に本契約があるかどうか
 * 
 */
export const useHasMainContract = () => {
  const [
    projId,
    contractId,
  ] = useTypedWatch({
    name: [
      'projId', 
      'contractId'],
  }) as [string, string];

  const { 
    data: contracts = [], 
    ...others
  } = useContractsByProjIdV2(projId);

  const isNewContract = !contractId; // Check if it's a new contract

  return {
    data: !!contracts?.length && contracts
      .some((contract) => {

        const isNotCurrentContract = contract.uuid.value !== contractId; // Check if it's a different contract than the one currently open

        return contract.contractType.value === '契約' // Check if it's a main contract
          && (
            isNotCurrentContract
            || isNewContract 
          ) 
        ;
      }),
    ...others,
  };
};