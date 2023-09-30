import { useContractsByYearMonth } from '../../../../hooks/useContractsByYearMonth';
import { useTypedWatch } from './useTypedRHF';

export const useContractsResult = () => {
  const [
    year,
    month,
  ] = useTypedWatch({
    name: [
      'year',
      'month',
    ],
  });


  return useContractsByYearMonth({
    year,
    month,
  });
};