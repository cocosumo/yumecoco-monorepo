import { usePromiseWithNotify } from '../../../hooks/usePromiseWithNotify';
import { fetchProjEstimatesById } from '../api/getProjEstimatesDataById';


export const useEstimateRecords = (projId: string) => {


  
  const { data, loading } = usePromiseWithNotify<Estimates.main.SavedData[]>(
    {
      promiseFunc: projId ? () => fetchProjEstimatesById(projId) : null,
      initialValue: [],
    },
  );

  return {
    projEstimateRecords: data,
    loading,
  };
};