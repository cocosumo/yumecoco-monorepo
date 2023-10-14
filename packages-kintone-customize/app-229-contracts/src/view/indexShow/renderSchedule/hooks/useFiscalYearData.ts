import { useQuery } from '@tanstack/react-query';
import { useTypedWatch } from './useTypedRHF';
import { getRecords } from 'api-kintone';

export const useFiscalYearData = () => {

  const fisyearYear = useTypedWatch({
    name: 'fiscalYear',
  });

  return useQuery(
    ['fiscalYearData', fisyearYear],
    () => getRecords<DBFYData.SavedRecord>({
      app: 270,
      query: `fiscalYear = "${fisyearYear}"`,
    }).then((res) => res.records?.[0]),
    {
      enabled: !!fisyearYear,
    },
  );
};