import { useContractsByCustGroupIdV2 } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedHooks';

export const useLinkedContracts = () => {
  const custGroupId = useTypedWatch({
    name: 'custGroupId',
  }) as string;

  return useContractsByCustGroupIdV2({ custGroupId });
};