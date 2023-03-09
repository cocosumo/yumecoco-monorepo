import { IInvoices } from 'types';

const isInvoiceOfEstimateId = (invoice: IInvoices, id: string) => (
  invoice.estimateLists.value.some(({ value: inv }) => inv.estimateId.value === id)
);

const isMoreRecent = (acc: IInvoices, cur: IInvoices) => (
  !acc?.issuedDateTime?.value || acc.issuedDateTime.value < cur.issuedDateTime.value
);

export const latestInvoiceReducer = (estimateId: string) =>
  (acc: IInvoices, cur: IInvoices) => (
    isInvoiceOfEstimateId(cur, estimateId) && isMoreRecent(acc, cur)
      ? cur
      : acc
  );

