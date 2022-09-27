import { useMemo } from 'react';
import { fetchEstimatesByProjId } from './../api/kintone/estimates/GET';
import { usePromiseWithNotify } from './usePromiseWithNotify';


export const useEstimateRecords = (projId: string) => {

  const memoPromiseFunc = useMemo(() => {
    return projId ? () => fetchEstimatesByProjId(projId) : null;
  }, [projId]);

  const { data, loading } = usePromiseWithNotify<Estimates.main.SavedData[]>(
    {
      promiseFunc: memoPromiseFunc,
      initialValue: [],
    },
  );

  return {
    projEstimateRecords: projId ? data : [],
    loading,
  };
};