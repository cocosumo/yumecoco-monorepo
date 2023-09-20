import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material';
import { SearchButton } from './SearchButton';
import { RankField } from './RankField';
import { NameFields } from './NameFields';
import { ContractAmt } from './ContractAmt';
import { DateRange } from '../fields/DateRange';
import { MemoField } from './MemoField';

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
          <NameFields />
          <ContractAmt />
          <DateRange 
            fromName='contractDateFrom'
            toName='contractDateTo'
            label='契約予定日'
          />
          <MemoField />
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