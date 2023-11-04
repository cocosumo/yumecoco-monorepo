import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from '@mui/material';
import { Stores } from './Stores';
import { Territories } from './Territories';
import { Officers } from './Officers';
import { DateRange } from '../../../fields/DateRange';
import { CustomerDetails } from './CustomerDetails';
import { ProjType } from './ProjType';
import { SearchButton } from './SearchButton';
import { DeletedProjectsToggle } from './DeletedProjectsToggle';
import { TotalContractAmtIncTax } from './TotalContractAmtIncTax';

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
          <TotalContractAmtIncTax />

          <DateRange 
            fromName='contractDateFrom'
            toName='contractDateTo'
            label='契約日'
          />
          <DateRange 
            fromName='deliveryDateFrom'
            toName='deliveryDateTo'
            label='引き渡し日'
          />
          <DateRange 
            fromName='lastBillDateFrom'
            toName='lastBillDateTo'
            label='最終請求日'
          />
          <DateRange 
            fromName='paidDateFrom'
            toName='paidDateTo'
            label='支払完了日'
          />
          <DateRange 
            fromName='completionDateFrom'
            toName='completionDateTo'
            label='物件完了日'
          />
          <DeletedProjectsToggle />
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