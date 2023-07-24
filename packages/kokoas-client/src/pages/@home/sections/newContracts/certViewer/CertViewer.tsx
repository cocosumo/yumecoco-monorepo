import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const CertViewer = ({
  open,
  contractId,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
  contractId: string,
}) => {


  return (
    <Dialog 
      onClose={handleClose}
      open={open}
      maxWidth='md'
      fullWidth

    >
      <DialogTitle>
        契約報告書
      </DialogTitle>
      <DialogContent
        sx={{
          height: '80vh',
        }}
      >
        Hello
        {contractId}
      </DialogContent>
      <DialogActions >
        <Button
          onClick={handleClose}
        >
          閉じる
        </Button>
        <Button
          variant='contained'
        >
          ダウンロード
        </Button>
      </DialogActions>
    </Dialog>
  );
};