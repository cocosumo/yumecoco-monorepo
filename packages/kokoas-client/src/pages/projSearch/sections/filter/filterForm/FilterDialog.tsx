import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from '@mui/material';
import { Stores } from './Stores';
import { Territories } from './Territories';
import { Officers } from './Officers';
import { DateRange } from '../../../fields/DateRange';
import { CustomerDetails } from './CustomerDetails';
import { ProjType } from './ProjType';

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
          <CustomerDetails />
          <Territories />
          <Stores />
          <ProjType />
          <Officers />
          <DateRange 
            fromName='contractDateFrom'
            toName='contractDateTo'
            label='契約日'
          />
          <DateRange 
            fromName='completionDateFrom'
            toName='completionDateTo'
            label='完工日'
          />
        </Stack>
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