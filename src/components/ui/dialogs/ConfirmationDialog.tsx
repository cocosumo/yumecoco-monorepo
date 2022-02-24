
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type Answer = 'ok' | 'cancel' | '';


interface ConfirmationDialogProps {
  state: {
    open: boolean,
    handleConfirmClose: (prev: Answer)=>void,
  },
  children: React.ReactNode
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { open, handleConfirmClose } = props.state;




  return (
    <div>
      <Dialog
        open={open}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'この内容で登録しますか。'}
        </DialogTitle>
        <DialogContent>

            {props.children}

        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleConfirmClose('ok')}>はい</Button>
          <Button onClick={()=>handleConfirmClose('cancel')} autoFocus>
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
