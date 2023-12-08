import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from 'api-kintone';
import format from 'date-fns/format';
import { KProjects } from 'types';
import { getLastDayOfMonth } from './helper/getLastDayOfMonth';

const projFinDate: KProjects = 'projFinDate';

export const useProjects = ({
  from,
  until,
}: {
  from: Date
  until: Date
}) => {

  const queryFrom = format(from, 'yyyy-MM-dd');
  const queryTo = getLastDayOfMonth(until);

  console.log('from', queryFrom, 'until', queryTo);

  return useQuery(
    ['contractsByCocoas', from, until],
    () => getAllProjects({ condition: `${projFinDate} >= ${queryFrom} and ${projFinDate} <= ${queryTo}` }),
  );
};
