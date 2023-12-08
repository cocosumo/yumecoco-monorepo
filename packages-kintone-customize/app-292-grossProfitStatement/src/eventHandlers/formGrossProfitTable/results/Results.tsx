import { CumulativeTableByArea } from './cumulativeTableByArea/CumulativeTableByArea';
import { GrossProfitByPerson } from './grossProfitByPerson/GrossProfitByPerson';
import { useContracts } from '../../hooks/useContracts';
import { useProjects } from '../../hooks/useProjects';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { SummaryContracts, getSummaryContracts } from '../../helpers/getSummaryContracts';
import { useMemo } from 'react';



export const Results = () => {
  const [
    selectMonths,
  ] = useTypedWatch({
    name: [
      'months',
    ],
  }) as [string[]];

  const { data: projects } = useProjects({
    from: new Date(selectMonths[0]),
    until: new Date(selectMonths[selectMonths.length - 1]),
  });

  const { data: contracts } = useContracts();

  const summaryContracts = useMemo(() => {
    if (!projects || !contracts) return [] as SummaryContracts[];

    return getSummaryContracts({
      projects: projects,
      contracts: contracts,
    });

  }, [projects, contracts]);

  return (
    <>
      <CumulativeTableByArea contractData={summaryContracts} />
      <GrossProfitByPerson contractData={summaryContracts} />
    </>
  );
};
