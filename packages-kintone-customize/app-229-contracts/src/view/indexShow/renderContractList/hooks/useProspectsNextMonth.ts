import { useQuery } from '@tanstack/react-query';
import { getMonthRange } from '../../../../helpers/getMonthRange';
import { useTypedWatch } from './useTypedRHF';
import { KProjects } from 'types';
import { getAllProjects } from 'api-kintone';
import { useCompletedContracts } from './useCompletedContracts';
import { useMemo } from 'react';
//import endOfMonth from 'date-fns/endOfMonth';
//import format from 'date-fns/format';

const schedContractDateKey: KProjects = 'schedContractDate';
const createDate: KProjects = '作成日時';


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
  ].join(' and ');

  

  const result = useQuery(
    ['prospectsNextMonth', condition],
    async () => getAllProjects({
      condition,
    }),
  );
  const { data: prospects } = result || {};

  const projIds = prospects?.map((prospect) => prospect.uuid.value) || [];

  const { data: contracts } = useCompletedContracts(projIds);

  const filteredData = useMemo(() => {
    if (!prospects || !contracts) {
      return null;
    }

    return  prospects?.filter((prospect) => {
      const projId = prospect.uuid.value;
      const hasContract = contracts?.some((contract) => contract.projId.value === projId);
      return !hasContract;
    });
  }, [
    prospects,
    contracts,
  ]);

  return {
    ...result,
    data: { 
      filteredData,
      contracts,
    },
  };
};