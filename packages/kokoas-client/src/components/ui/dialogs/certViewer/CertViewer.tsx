import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useResolveForm } from './hooks/useResolveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { CertViewerDialogBody } from './CertViewerDialogBody';


export const CertViewer = ({
  open,
  contractId,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
  contractId: string,
}) => {
  
  const {
    newFormValues,
  } = useResolveForm(contractId, open);

  const formReturn = useForm({
    defaultValues: newFormValues,
    resolver: zodResolver(schema),
  });
  
  const {
    reset,
  } = formReturn;


  useEffect(() => {
    if (!open) return;
    reset(newFormValues);
  }, [
    reset,
    newFormValues,
    open,
  ]);



  return (
    <FormProvider {...formReturn}>
      <Dialog 
        onClose={handleClose}
        open={open}
        keepMounted={false}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '650px',
          },
        }}
      >
        <CertViewerDialogBody 
          contractId={contractId}
          handleClose={handleClose}
        />
      </Dialog>
    </FormProvider>
  );
};