import { useQuery } from '@tanstack/react-query';
import { GetAllSuppliersParams, getAllSuppliers } from 'api-kintone/src/suppliers/getAllSuppliers';
import { AppIds } from 'config';
import { ISuppliers } from 'types';


interface QueryOptions <T = ISuppliers> {
  select: (data: ISuppliers[]) => T;
}
interface UseAllSuppliersParams<T = ISuppliers> {
  queryParams?: GetAllSuppliersParams;
  queryOptions?: QueryOptions<T>;
}

/**
 *　取引先を全て取得する
 */
export const useAllSuppliers = <T = ISuppliers>(params?: UseAllSuppliersParams<T>) => {
  const {
    queryOptions,
  } = params || {};
  return useQuery({
    queryKey: [AppIds.suppliers, params?.queryParams],
    queryFn: () => getAllSuppliers(params?.queryParams),
    select: queryOptions?.select,
  });
};