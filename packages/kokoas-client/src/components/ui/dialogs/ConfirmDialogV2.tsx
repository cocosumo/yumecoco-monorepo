import { IDialogState } from './GlobalConfirmDialog';
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, Alert  } from '@mui/material';

export const ConfirmDialogV2 = ({
  open = true,
  title,
  content,
  yesText = 'はい',
  noText = 'いいえ',
  withNo = true,
  withYes = true,
  handleYes,
  handleNo,
  cancellable,
  severity,
}: IDialogState) => {
  return (
    <Dialog
      open={open}
      onClose={cancellable ? handleNo : undefined}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {!!severity && <Alert severity={severity}>
          {content}
        </Alert>}

        {!severity && content}
      </DialogContent>
      <DialogActions>
        {withYes &&
          <Button onClick={handleYes} variant="outlined">
            {yesText}
          </Button>}

        {withNo &&
          <Button onClick={handleNo} variant="outlined" color="error">
            {noText}
          </Button>}
      </DialogActions>

    </Dialog>
  );
};