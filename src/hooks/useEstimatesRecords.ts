import { fetchEstimatesByProjId } from './../api/kintone/estimates/GET';
import { usePromiseWithNotify } from './usePromiseWithNotify';


export const useEstimateRecords = (projId: string) => {

  const { data, loading } = usePromiseWithNotify<Estimates.main.SavedData[]>(
    {
      promiseFunc: projId ? () => fetchEstimatesByProjId(projId) : null,
      initialValue: [],
    },
  );

  return {
    projEstimateRecords: projId ? data : [],
    loading,
  };
};