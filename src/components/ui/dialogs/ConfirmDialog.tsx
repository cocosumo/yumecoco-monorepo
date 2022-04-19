import {
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Button,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean,
  title: string,
  content: string,
  handleAnswer: (isYes: boolean) => void
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    open,
    title,
    content,
    handleAnswer,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={()=>handleAnswer(false)}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>handleAnswer(true)} variant="outlined">はい</Button>
        <Button onClick={()=>handleAnswer(false)} variant="outlined" color="error">いいえ</Button>
      </DialogActions>

    </Dialog>
  );
};