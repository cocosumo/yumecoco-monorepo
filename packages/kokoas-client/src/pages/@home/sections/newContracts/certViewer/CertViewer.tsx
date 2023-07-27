import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import { useCallback, useEffect, useRef } from 'react';
import {  toJpeg } from 'html-to-image';
import { CertViewerContent } from './CertViewerContent';
import { useContractReport } from 'kokoas-client/src/hooksQuery';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { FormProvider, useForm } from 'react-hook-form';
import { useResolveForm } from './hooks/useResolveForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';


export const CertViewer = ({
  open,
  contractId,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
  contractId: string,
}) => {
  
  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigateWithQuery();

  const { 
    data: imageBase64,
    isLoading, 
  } = useContractReport(contractId, {
    enabled: open,
  });

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { 
      cacheBust: true, 
      skipFonts: true,
      
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);


  const newFormValue = useResolveForm(contractId, open);

  const formReturn = useForm({
    defaultValues: newFormValue,
    resolver: zodResolver(schema),
  });
  
  const {
    reset,
    formState: {
      isDirty,
      isSubmitting,
    },
  } = formReturn;


  useEffect(() => {
    reset(newFormValue);
  }, [
    reset,
    newFormValue,
  ]);

  return (
    <FormProvider {...formReturn}>
      <Dialog 
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          契約報告書
        </DialogTitle>
        <DialogContent
          ref={ref}
          sx={{
            overflow: 'hidden',
            height: '75vh',
            width: '600px',
          }}
        >
          {isLoading && (
          <Loading />
          )}
          {imageBase64 && (
          <CertViewerContent 
            imageBase64={imageBase64}
          />
          )}
   
        </DialogContent>
        <DialogActions >
          <Button
            onClick={handleClose}
          >
            閉じる
          </Button>
          <Button
            onClick={() => {
              navigate('projContractPreviewV2', {
                contractId,
              });
            }}
          >
            編集する
          </Button>
          <Button
            variant='contained'
            onClick={onButtonClick}
            disabled={isDirty || isSubmitting}
          >
            ダウンロード
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};