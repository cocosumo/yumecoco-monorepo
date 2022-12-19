
import { useProjects } from './useProjects';

export const useProjsByCustGroupId = (
  custGroupId: string,
) => {
  return useProjects({
    select: (data) => data
      .filter(
        (rec) => rec.custGroupId.value === custGroupId
        && !rec.cancelStatus.value,
      ),
  });
};