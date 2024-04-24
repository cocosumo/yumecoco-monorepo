import { Button, Fade } from '@mui/material';
import { useInvoiceWatch } from '../hooks/useInvoiceRHF';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';
import { useInvoiceStatus } from '../hooks/useInvoiceStatus';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';

export const NextStateButton = () => {
  const { setDialogState } = useConfirmDialog();
  const isFormIdle = useIsFormIdle();

  const invoiceId = useInvoiceWatch({
    name: 'invoiceId',
  }) as string;

  const {
    handleSubmit,
  } = useSaveInvoiceForm();

  const {
    current,
    next,
  } = useInvoiceStatus();

  return (
    <Fade in={isFormIdle}>
      <Button
        color='info'   
        variant='contained' 
        value={'next'}
        onClick={(e) => {
          setDialogState({
            open: true,
            title: `ステータスは【${next}】に更新しますか？`,
            handleYes: () => handleSubmit(e),
          });
                      
        }}
      >
        {!!invoiceId && next}
        {invoiceId === '' && '請求確認済'}
        {current === '支払済' && '保存'}
      </Button>
    </Fade>
  );
};