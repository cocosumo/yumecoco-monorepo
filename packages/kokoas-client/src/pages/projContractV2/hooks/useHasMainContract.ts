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

  /** 新規契約かどうか */
  const isNewContract = !contractId; 

  return {
    data: !!contracts?.length && contracts
      .some((contract) => {

        /** 開いている契約以外の契約かどうか */
        const isNotCurrentContract = contract.uuid.value !== contractId; 

        return contract.contractType.value === '契約' // 本契約かどうか
          && (
            isNotCurrentContract
            || isNewContract 
          ) 
        ;
      }),
    ...others,
  };
};