import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AmountRange } from './AmountRange';
import { ContractDateRange } from './ContractDateRange';
import { FilterForm } from './FilterForm';


export const FilterDialog = ({
  open,
  handleClose,
}: {
  open: boolean,
  handleClose: () => void
}) => {


  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <DialogContent >
        <FilterForm>
          <AmountRange />
          <ContractDateRange />
        </FilterForm>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          閉じる
        </Button>
        <Button variant={'contained'}>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};