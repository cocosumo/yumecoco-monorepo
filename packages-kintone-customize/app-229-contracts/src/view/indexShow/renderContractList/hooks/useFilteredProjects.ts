import { useQuery } from '@tanstack/react-query';
import { useTypedWatch } from './useTypedRHF';
import { getAllProjects } from 'api-kintone';
import { getMonthRange } from '../../../../helpers/getMonthRange';
import { KProjects } from 'types';

const dateFieldKey: KProjects = '作成日時';

/**
 * フォームの年月から、その年月のプロジェクトを取得する
 * 
 * @returns 
 */
export const useFilteredProjects = () => {
  const [
    year,
    month,
  ] = useTypedWatch({
    name: [
      'year',
      'month',
    ],
  });

  const {
    minDateStr,
    maxDateteStr,
  } = getMonthRange(year, month);

  const condition = [
    `${dateFieldKey} >= "${minDateStr}"`,
    `${dateFieldKey} <= "${maxDateteStr}"`,
  ].join(' and ');
  

  return useQuery(
    ['filteredProjects', condition],
    () => getAllProjects({
      condition,
    }),
  );
};
