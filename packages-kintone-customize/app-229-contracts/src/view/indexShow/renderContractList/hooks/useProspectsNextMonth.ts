import { useQuery } from '@tanstack/react-query';
import { getMonthRange } from '../../../../helpers/getMonthRange';
import { useTypedWatch } from './useTypedRHF';
import { KProjects } from 'types';
import { getAllProjects } from 'api-kintone';
import { useCompletedContracts } from './useCompletedContracts';

const schedContractDateKey: KProjects = 'schedContractDate';
const createDate: KProjects = '作成日時';
const recordStatus: KProjects = 'cancelStatus';


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

  const schedContractCondition = [
    `${schedContractDateKey} > "${maxDateStr}"`,
    `${schedContractDateKey} = ""`,
  ].join(' or ');

  const condition = [
    `(${schedContractCondition})`,
    `${createDate} <= "${maxDateStr}"`,
    `${recordStatus} = ""`,
  ].join(' and ');

  

  // cache projects
  const result = useQuery(
    ['registeredProjects', condition],
    async () => getAllProjects({
      condition,
    }),
  );
  const { data: projects } = result || {};

  const projIds = projects?.map((p) => p.uuid.value) || [];
  
  // cache contracts
  const { data: contracts } = useCompletedContracts(projIds);

  // Cached final result
  const { data: prospectsNextMonth } = useQuery(
    ['prospectsNextMonth', condition],
    async () => {
      if (!projects || !contracts) {
        return null;
      }
  
      return  projects?.filter((p) => {
        const projId = p.uuid.value;
        const hasContract = contracts?.some((contract) => contract.projId.value === projId);
        return !hasContract;
      });
    },
    {
      enabled: !!projects && !!contracts,
    },
  );

  return {
    ...result,
    data: { 
      filteredData: prospectsNextMonth,
      contracts,
    },
  };
};