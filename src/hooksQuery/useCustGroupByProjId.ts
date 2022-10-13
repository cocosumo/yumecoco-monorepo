import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';


export const useCustGroupByProjId = (projId: string) => {
  return useQuery(
    [APPIDS.custGroup, { projId }],
    () => {
      return;
    },
    {
      enabled: !projId,
    },
  );
};