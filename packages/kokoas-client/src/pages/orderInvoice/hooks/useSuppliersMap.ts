import { useAllSuppliers } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { KSuppliers } from 'types';

const fields: KSuppliers[] = [
  'managementID',
  'businessNumber',
  'supplierName',
];

/**
 * 取引先を取得し、ハッシュマップに変換する。
 * 
 * キーを使用して直接値にアクセスできるため、データの検索が高速になることです。
 * 
 * */
export type UseSuppliersMapReturn = Record<string, 
{
  invoiceSystemNumber: string;
  supplierName: string;
}>;

export const useSuppliersMap = () => {
  return useAllSuppliers({
    queryParams: { fields },
    queryOptions: {
      select: useCallback((data) => {
        return data.reduce<UseSuppliersMapReturn>((acc, cur) => {
     
          acc[cur.managementID.value] = {
            invoiceSystemNumber: cur.businessNumber.value,
            supplierName: cur.supplierName.value,
          };

          return acc;
        }
        , Object.create(null));
      }, 
      []),
    },
  });
};
