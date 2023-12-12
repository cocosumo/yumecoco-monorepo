import { CumulativeTableByArea } from './cumulativeTableByArea/CumulativeTableByArea';
import { GrossProfitByPerson } from './grossProfitByPerson/GrossProfitByPerson';
import { useContracts } from '../../hooks/useContracts';
import { useProjects } from '../../hooks/useProjects';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { SummaryContracts, getSummaryContracts } from '../../helpers/getSummaryContracts';
import { useMemo } from 'react';
import { useAndpadProcurement } from '../../hooks/useAndpadProcurement';
import { useProjTypes } from '../../hooks/useProjTypes';
import { getDatePeriod } from './helper/getDatePeriod';



export const Results = () => {
  const [
    selectMonths,
    year,
  ] = useTypedWatch({
    name: [
      'months',
      'year',
    ],
  }) as [string[], string];

  const {
    finDate,
    startDate,
  } = getDatePeriod(selectMonths, year);

  const { data: projects } = useProjects({
    from: startDate,
    until: finDate,
  });

  const { data: contracts } = useContracts();
  const { data: andpadProcurement } = useAndpadProcurement({ until: finDate });
  const { data: projTypes } = useProjTypes();

  const summaryContracts = useMemo(() => {
    if (
      !projects
      || !contracts
      || !andpadProcurement
      || !projTypes
    ) return [] as SummaryContracts[];

    return getSummaryContracts({
      projects: projects,
      contracts: contracts,
      andpadProcurement: andpadProcurement,
      projTypes: projTypes,
    });
  }, [projects, contracts, andpadProcurement, projTypes]);


  return (
    <>
      <CumulativeTableByArea contractData={summaryContracts} />
      <GrossProfitByPerson contractData={summaryContracts} />
    </>
  );
};
