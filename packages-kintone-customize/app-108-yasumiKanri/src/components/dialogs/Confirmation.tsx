import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';


const Confirmation = ({ 
  question, 
  open, 
  setOpen, 
  actionOnYes,
}: {
  question: any,
  open: boolean,
  setOpen: any,
  actionOnYes: any,
}) => {

  const handleClose = (isPressedYes: boolean) => () => {
    console.log(isPressedYes);
    setOpen((prev: any) =>({ ...prev, ...{ isOpen: false, isPressedYes } }));
    if (isPressedYes) {
      actionOnYes();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        確認
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {question}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClose(true)}
        >
          はい
        </Button>
        <Button variant="contained" onClick={handleClose(false)}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>);
};

export default Confirmation;

