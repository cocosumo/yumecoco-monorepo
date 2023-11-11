import { Dialog, DialogTitle } from '@mui/material';
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
      maxWidth='md'
      fullWidth
    >
      <DialogTitle>
        OBを検索する
      </DialogTitle>
      <SearchDialogContent />
    </Dialog>
  );
};