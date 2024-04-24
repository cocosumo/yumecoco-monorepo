import { Fade } from '@mui/material';
import { useInvoiceFormContext } from '../hooks/useInvoiceRHF';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { useInvoiceStatus } from '../hooks/useInvoiceStatus';
import { useIsFormIdle } from 'kokoas-client/src/hooks/useIsFormIdle';
import { useDeleteInvoiceB2BBy$Id, useInvoiceB2BByProjId } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import { IInvoiceb2b } from 'types';
import { useSaveInvoiceForm } from '../hooks/useSaveInvoiceForm';
import { invoiceDialogAtom } from '../InvoiceFormDialog';
import { useSetAtom } from 'jotai';
import { LoadingButton } from '@mui/lab';

export const PrevStateButton = () => {
  const setInvoiceDialogAtom = useSetAtom(invoiceDialogAtom);

  const { setDialogState } = useConfirmDialog();
  const { control } = useInvoiceFormContext();
  const isFormIdle = useIsFormIdle();

  const [
    invoiceId,
    projId,
  ] = useWatch({
    control,
    name: [
      'invoiceId',
      'projId',
    ],
  });

  const { data: invoiceData } = useInvoiceB2BByProjId<IInvoiceb2b | undefined>({ 
    projId, 
    select: (recs) => recs.find((d) => d.uuid.value === invoiceId),
  });
  
  const { mutateAsync, isLoading } = useDeleteInvoiceB2BBy$Id();
  const {
    $id,
  } = invoiceData || {};

  const {
    handleSubmit,
    isSaving,
  } = useSaveInvoiceForm();

  const {
    prev,
  } = useInvoiceStatus();

  return (
    <Fade in={isFormIdle && !!$id?.value}>
      <LoadingButton
        color={prev ? 'info' : 'error'}   
        variant='contained' 
        value={'prev'}
        loading={isSaving || isLoading}
        onClick={(e) => {
          if (!$id?.value) return;

          if (prev) {
            handleSubmit(e);
          } else {
            setDialogState({
              open: true,
              title: 'この請求は削除しますか？',
              content: '削除すると元に戻すことはできません。',
              handleYes: async () => {
                await mutateAsync($id?.value);
                setInvoiceDialogAtom((prevDialog) => ({
                  ...prevDialog,
                  open: true,
                  invoiceId: '',
                }));
            
              },
            });
          }
                      
        }}
      >
        {!!prev && '差し戻し'}
        {!prev && '削除'}
      </LoadingButton>
    </Fade>
  );
};