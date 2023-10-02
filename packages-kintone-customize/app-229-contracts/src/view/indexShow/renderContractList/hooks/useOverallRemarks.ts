import format from 'date-fns/format';
import { useTypedWatch } from './useTypedRHF';
import { useQuery } from '@tanstack/react-query';
import { getAllRecords } from 'api-kintone';

type KDBOverall = keyof DBOverall.SavedRecord;
const dateKey: KDBOverall = 'reportDate'; 

export const useOverallRemarks = () => {
  const [
    year,
    month,
  ] = useTypedWatch({
    name:[
      'year',
      'month',
    ],
  });

  const minDateStr = format(new Date(+year, +month - 1, 1), 'yyyy-MM-dd');
  const maxDateteStr = format(new Date(+year, +month, 0), 'yyyy-MM-dd');

  const condition = [
    `${dateKey} >= "${minDateStr}"`,
    `${dateKey} <= "${maxDateteStr}"`,
  ].join(' and ');

  return useQuery(
    ['overallremarks', condition],
    async () => getAllRecords<DBOverall.SavedRecord>({
      app: 263,
      condition,
    }).then((res) => res?.[0] || null),
  );
};