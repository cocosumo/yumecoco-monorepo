import { useMutation } from '@tanstack/react-query';
import { downloadInvoiceId } from '../api/kintone/invoice/downloadInvoiceId';
import { useCommonOptions } from './useCommonOptions';


/**
 * 請求書を取得する。
 *
 */
export const useDownloadInvoiceId = () => {  
  const commonOptions = useCommonOptions();

  return useMutation(
    downloadInvoiceId,
    {
      ...commonOptions,
    },
  );
};