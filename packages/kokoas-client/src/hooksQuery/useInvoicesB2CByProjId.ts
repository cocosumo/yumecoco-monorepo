import { useQuery } from '@tanstack/react-query';
import { getInvoicesB2CByProjId } from 'api-kintone/src/invoiceB2C/getInvoicesB2CByProjId';
import { AppIds } from 'config';


/** 工事番号で請求一覧（B2C）を取得する */
export const useInvoicesB2CByProjId = (
  projId = '',
  enabled = true,
) => {

  return useQuery(
    [AppIds.invoiceB2C, { projId }],
    () => getInvoicesB2CByProjId(projId),
    {
      enabled: !!projId && enabled,
    },
  );
};
