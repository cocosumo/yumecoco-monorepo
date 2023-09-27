import { useQuery } from '@tanstack/react-query';
import { getMonthRange } from '../../../../helpers/getMonthRange';
import { useTypedWatch } from './useTypedRHF';
import { KProjects } from 'types';
import { getAllProjects } from 'api-kintone';
import { useCompletedContracts } from './useCompletedContracts';

const schedContractDate: KProjects = 'schedContractDate';


/**
 * 来月見込み
 * * 次月と見込み案件の「契約予定日」の月と一緒、もしくは「契約予定日」が空。
 * * 引っ張るのは「契約予定金額」
 * * 契約がない
 * 
 * 情報元はココアスの「工事内容」と「契約」
 */
export const useProspectsNextMonth = () => {
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
    maxDateStr,
  } = getMonthRange(year, month);

  const condition = [
    `${schedContractDate} > "${maxDateStr}"`,
    `${schedContractDate} = ""`,
  ].join(' or ');

  const { data: contracts } = useCompletedContracts();

  return useQuery(
    ['prospectsNextMonth', condition],
    async () => getAllProjects({
      condition,
    }).then(
      (res) => res
        .filter((project) => {
        // 契約がないもののみ
          const hasContract = contracts?.some((c) => c.projId.value === project.uuid.value);
          return !hasContract;
        }),
    ),
    {
      enabled: !!contracts,
    },

  );
};