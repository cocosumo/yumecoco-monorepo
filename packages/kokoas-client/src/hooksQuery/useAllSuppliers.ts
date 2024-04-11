import { useQuery } from '@tanstack/react-query';
import { GetAllSuppliersParams, getAllSuppliers } from 'api-kintone/src/suppliers/getAllSuppliers';
import { AppIds } from 'config';


/**
 *　取引先を全て取得する
 */
export const useAllSuppliers = (params?: GetAllSuppliersParams) => {
  return useQuery(
    [AppIds.suppliers, 'allSuppliers', params],
    () => getAllSuppliers(params),
  );
};