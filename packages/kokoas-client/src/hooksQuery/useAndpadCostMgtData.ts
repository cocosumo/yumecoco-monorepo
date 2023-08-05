import { useQuery } from "@tanstack/react-query";
import { getCostMgtData } from "api-kintone";
import { AppIds } from "config";
import { useCommonOptions } from "./useCommonOptions";

export const useCostManagementData = (projId: string) => {
  const {
    onError,
  } = useCommonOptions()

  return useQuery(
    [AppIds.projects, 'andpad', projId],
    () => getCostMgtData(projId),
    {
      enabled: !!projId || enabled,
      staleTime: 5000,
      onError,
    },
  );
};