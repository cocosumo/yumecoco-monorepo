import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigateWithQuery } from 'kokoas-client/src/hooks';
import { useCallback, useRef } from 'react';
import {  toJpeg } from 'html-to-image';
import { CertViewerContent } from './CertViewerContent';


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


  return (
    <Dialog 
      onClose={handleClose}
      open={open}
      maxWidth='md'

    >
      <DialogTitle>
        契約報告書
      </DialogTitle>
      <DialogContent
        ref={ref}
        sx={{
          color: 'red',
          overflow: 'hidden',
        }}
      >
        <CertViewerContent 
          contractId={contractId}
        />
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
        >
          ダウンロード
        </Button>
      </DialogActions>
    </Dialog>
  );
};