import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FilterDialogContent } from './FilterDialogContent';

export const FilterDialog = (props: {
  open: boolean,
  onClose: () => void,
}) => {
  const { open, onClose } = props;

  const handleClear = () => {
    onClose();
  };

  const handleFilter = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>絞り込む</DialogTitle>
      <DialogContent dividers >
        <FilterDialogContent />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClear}
          variant={'outlined'}
        >
          解除
        </Button>
        <Button
          onClick={handleFilter}
          variant={'contained'}
        >
          絞り込む
        </Button>
      </DialogActions>
    </Dialog>
  );
};