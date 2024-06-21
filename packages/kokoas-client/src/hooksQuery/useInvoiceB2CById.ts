import { useQuery } from '@tanstack/react-query';
import { getInvoiceB2CById } from 'api-kintone/src/invoiceB2C/getInvoiceB2CById';
import { AppIds } from 'config';


/** uuidで請求書（B2C）を取得する */
export const useInvoiceB2CById = (
  invoiceId = '',
  enabled = true,
) => {

  return useQuery(
    [AppIds.invoiceB2C, { invoiceId }],
    () => getInvoiceB2CById(invoiceId),
    {
      enabled: !!invoiceId && enabled,
    },
  );
};
