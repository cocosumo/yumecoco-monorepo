import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Preview } from './Preview';

export const ContractDialog = ({
  open, handleClose,
}: {
  open: boolean,
  handleClose: () => void
}) => {



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth

    >
      <DialogTitle>
        契約のプレビュー
      </DialogTitle>
      <DialogContent>
        <Preview />
      </DialogContent>
      <DialogActions>
        <Button>
          ダウンロード
        </Button>
        <Button>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );

};