import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AmountRange } from './AmountRange';
import { ContractDateRange } from './ContractDateRange';
import { ContractStatus } from './ContractStatus';
import { FilterDialogContent } from './FilterDialogContent';
import { SubmitButton } from './SubmitButton';
import { Stores } from './Stores';


export const FilterDialog = ({
  open,
  handleClose,
  handleSubmit,
  minAmount,
  maxAmount,
}: {
  open: boolean,
  handleClose: () => void,
  handleSubmit: () => void,
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
        <Stores />

        <AmountRange minAmount={minAmount} maxAmount={maxAmount} />
        <ContractDateRange />
        <ContractStatus />

      </FilterDialogContent>
      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          閉じる
        </Button>
        <SubmitButton onClick={handleSubmit} >
          検索
        </SubmitButton>
      </DialogActions>

    </Dialog>

  );
};