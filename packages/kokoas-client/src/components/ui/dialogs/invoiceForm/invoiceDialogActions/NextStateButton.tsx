import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';
import { useInvoiceStatus } from '../hooks/useInvoiceStatus';
import { LoadingButton } from '@mui/lab';

export const NextStateButton = () => {

  const invoiceId = useInvoiceWatch({
    name: 'invoiceId',
  }) as string;

  const {
    handleSubmit,
    isSaving,
  } = useSaveInvoiceForm();

  const {
    current,
    next,
  } = useInvoiceStatus();

  return (
    <LoadingButton
      color='info'   
      variant='contained' 
      value={'next'}
      onClick={handleSubmit}
      loading={isSaving}
    >
      {!!invoiceId && current !== '支払済' && next}
      {current === '支払済' && '保存'}
      {invoiceId === '' && '請求確認済'}
    </LoadingButton>

  );
};