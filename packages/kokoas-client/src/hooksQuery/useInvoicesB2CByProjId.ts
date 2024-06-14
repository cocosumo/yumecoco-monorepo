import { useQuery } from '@tanstack/react-query';
import { getInvoicesB2CByProjId } from 'api-kintone/src/invoiceB2C/getInvoicesB2CByProjId';
import { AppIds } from 'config';



export const useInvoicesB2CByProjId = <T>(
  projId = '',
  options?: { select: (data: Awaited<ReturnType<typeof getInvoicesB2CByProjId>>) => T },
) => {

  return useQuery(
    [AppIds.invoiceB2C, { projId }],
    () => getInvoicesB2CByProjId(projId),
    {
      enabled: !!projId,
      ...options,
    },
  );
};
