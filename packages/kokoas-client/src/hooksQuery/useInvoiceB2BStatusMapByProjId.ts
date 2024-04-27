import { KInvoiceProgress } from 'types/src/common/order';
import { useInvoiceB2BByProjId } from './useInvoiceB2BByProjId';
import {  useMemo } from 'react';



export interface InvoiceB2BStatusMapByProjIdReturn {
  [orderId: string]: Record<KInvoiceProgress, number>;
}


/**
 * orderIdをキーとした、請求書ステータスのマップを返す
 * 
 * @param projId 工事ID uuid
 */
export const useInvoiceB2BStatusMapByProjId = (projId: string) => {
  return useInvoiceB2BByProjId<InvoiceB2BStatusMapByProjIdReturn>({ 
    projId,
    // Was trying to memoize using useCallback but the type of the function was not being inferred correctly.
    // for now, we will use useMemo instead.
    // TODO: investigate more about useCallback type inference.
    select : useMemo(
      () => (d) => {
        
        return (d ?? [])
          .reduce<InvoiceB2BStatusMapByProjIdReturn>(
          (acc, cur) => {
            const orderId = cur.orderId.value;
            if (!acc[orderId]) {
              acc[orderId] = Object.create(null);
            }

            const invoiceStatus = cur.invoiceStatus.value as KInvoiceProgress;

            acc[orderId][invoiceStatus] = (acc[orderId][invoiceStatus] ?? 0) + 1;

            return acc;
          }, Object.create(null),
        );

      }, [],
    ),
  });
};