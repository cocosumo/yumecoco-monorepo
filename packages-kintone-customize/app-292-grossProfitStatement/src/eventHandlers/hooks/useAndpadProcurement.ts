import { useQuery } from '@tanstack/react-query';
import { getAllProcurementDetails } from 'api-kintone';
import { KProjects } from 'types';
import { getLastDayOfMonth } from './helper/getLastDayOfMonth';

const projFinDate: KProjects = 'projFinDate';

export const useAndpadProcurement = ({
  until,
}: {
  until: Date
}) => {

  const queryTo = getLastDayOfMonth(until);

  return useQuery(
    ['andpadProcurement', until],
    () => getAllProcurementDetails({ condition: `${projFinDate} <= ${queryTo}` }),
  );
};
