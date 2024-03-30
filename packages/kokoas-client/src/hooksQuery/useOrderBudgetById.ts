import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';


/**
 * 発注一覧を取得する
 * @param projId uuidのことを指します。
 */
export const useOrderBudgetById = (projId: string) => {

  return useQuery({
    queryKey: [AppIds.orderBudget, projId],
    queryFn: async () => {
      
      if (!projId) return null;
      
      return getOrderBudgetById(projId);
    },
    enabled: !!projId,
  });

};
