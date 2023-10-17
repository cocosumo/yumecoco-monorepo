import { useQuery } from '@tanstack/react-query';
import { useTypedWatch } from './useTypedRHF';
import { getRecords } from 'api-kintone';
import { TForm } from '../schema';

export type Targets = Record<string, {
  yearlyTarget: number;
  monthlyTarget: number;
  projTypeName: string;
}>;

export const useFiscalYearData = () => {

  const [fisyearYear] = useTypedWatch({
    name: [
      'fiscalYear',
    ],
  }) as [
    TForm['fiscalYear'],
  ];

  const { data, ...others } = useQuery(
    ['fiscalYearData', fisyearYear],
    () => getRecords<DBFYData.SavedRecord>({
      app: 270,
      query: `fiscalYear = "${fisyearYear}"`,
    })
      .then((res) => res.records?.[0]),
    {
      enabled: !!fisyearYear,
    },
  );

  

  return {
    data,
    ...others,
  }; 
};