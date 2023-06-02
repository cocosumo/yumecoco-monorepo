import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const FilterDialog = ({
  open,
  handleClose,
}:{
  open: boolean
  handleClose: () => void
}) => {
  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <DialogContent>
        Test
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          キャンセル
        </Button>
        <Button variant='contained'>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};