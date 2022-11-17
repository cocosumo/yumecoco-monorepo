import { useQuery } from '@tanstack/react-query';
import { getInVoiceByProjId } from 'api-kintone/src/invoice/getInVoiceByProjId';
import { AppIds } from 'config';

export const useInvoicesByProjId = (
  projId = '',
) => {
  return useQuery(
    [AppIds.invoices],
    getInVoiceByProjId(projId),
  );
};