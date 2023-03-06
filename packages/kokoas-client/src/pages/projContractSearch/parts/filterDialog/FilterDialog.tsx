import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AmountRange } from './AmountRange';
import { ContractDateRange } from './ContractDateRange';
import { ContractStatus } from './ContractStatus';
import { FilterDialogContent } from './FilterDialogContent';
import { SubmitButton } from './SubmitButton';


export const FilterDialog = ({
  open,
  handleClose,
  minAmount,
  maxAmount,
}: {
  open: boolean,
  handleClose: () => void,
  minAmount: number,
  maxAmount: number,
}) => {

  return (

    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <FilterDialogContent>
        <AmountRange minAmount={minAmount} maxAmount={maxAmount} />
        <ContractDateRange />
        <ContractStatus />
      </FilterDialogContent>
      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          閉じる
        </Button>
        <SubmitButton onClick={handleClose} >
          検索
        </SubmitButton>
      </DialogActions>

    </Dialog>

  );
};