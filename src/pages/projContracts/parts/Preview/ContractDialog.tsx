import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

    >
      <DialogTitle>
        契約のプレビュー
      </DialogTitle>
      <DialogContent>
        契約
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