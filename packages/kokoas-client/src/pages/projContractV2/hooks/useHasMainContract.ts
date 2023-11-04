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

  console.log('contracts', contracts, contractId);

  return {
    data: contracts
      .some((contract) => contract.contractType.value === '契約' && contract.uuid.value !== contractId),
    ...others,
  };
};