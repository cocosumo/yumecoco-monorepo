import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { SearchDialogContent } from './SearchDialogContent';

export const SearchDialog = ({
  open,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
}) => {
  

  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
        OBを検索する
      </DialogTitle>
      <SearchDialogContent 
        handleCloseDialog={handleClose}
      />
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};