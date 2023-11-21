import { useQuery } from '@tanstack/react-query';
import { getAllProcurementDetails } from 'api-kintone';
import { AppIds } from 'config';

type DefaultResult = Awaited<ReturnType<typeof getAllProcurementDetails>>;


/**
 * Custom hook for fetching 発注情報.
 * 
 * @template T - The type of the selected data.
 * @param options - The options for the hook.
 * @param options.enabled - Whether the query is enabled or not.
 * @param options.select - The function to select the data.
 * @param options.onSuccess - The function to be called on successful data retrieval.
  */
export const useAllProcurements = <T = DefaultResult>(options?: {
  enabled?: boolean,
  select: (data: DefaultResult) => T,
  onSuccess?: (data: T) => void
}) => {
  return useQuery(
    [AppIds.andpadProcurements, 'procurements'],
    () => getAllProcurementDetails(),
    {
      ...options,
    },
  );
};