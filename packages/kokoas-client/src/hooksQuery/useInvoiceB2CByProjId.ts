import { useQuery } from '@tanstack/react-query';
import { getInvoiceB2CByProjId } from 'api-kintone/src/invoiceB2C/getInvoiceB2CByProjId';
import { AppIds } from 'config';



export const useInvoiceB2CByProjId = <T>(
  projId = '',
  options?: { select: (data: Awaited<ReturnType<typeof getInvoiceB2CByProjId>>) => T },
) => {

  return useQuery(
    [AppIds.invoiceB2C, { projId }],
    () => getInvoiceB2CByProjId(projId),
    {
      enabled: !!projId,
      ...options,
    },
  );
};
