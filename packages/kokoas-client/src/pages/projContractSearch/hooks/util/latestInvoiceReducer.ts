import { IInvoices } from 'types';

/** Reducer fn to get latest issued invoice
 * 直近発行した請求書を取得するreducer関数
 *
 * 直近の判定は仮実装です。確認お願いします。~ras
*/
export const latestInvoiceReducer = (estimateId: string) => (acc: IInvoices, cur: IInvoices) => {
  const isInvoiceOfEstimateId = cur.estimateLists.value.some(({ value: inv }) => inv.estimateId.value === estimateId);

  return (isInvoiceOfEstimateId && (!acc?.issuedDateTime?.value || acc.issuedDateTime.value < cur.issuedDateTime.value))
    ? cur
    : acc;
};