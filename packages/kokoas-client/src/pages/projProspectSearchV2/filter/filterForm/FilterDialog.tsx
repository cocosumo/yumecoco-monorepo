import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from '@mui/material';
import { SearchButton } from './SearchButton';
import { RankField } from './RankField';

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
        <Stack spacing={2} divider={<Divider />}>
          <RankField />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          キャンセル
        </Button>
        <SearchButton handleClose={handleClose} />
      </DialogActions>
    </Dialog>
  );
};