import { Button, Dialog, DialogActions, DialogTitle, Divider } from '@mui/material';
import { AmountRange } from './amountRange/AmountRange';
import { ContractDateRange } from './ContractDateRange';
import { ContractStatus } from './ContractStatus';
import { FilterDialogContent } from './FilterDialogContent';
import { SubmitButton } from './SubmitButton';
import { Stores } from './Stores';
import { ProjectTypes } from './ProjectTypes';


export const FilterDialog = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean,
  handleClose: () => void,
  handleSubmit: () => void,
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
        <Divider />

        <ProjectTypes />
        <Divider />

        <AmountRange />
        <Divider />

        <ContractDateRange />
        <Divider />
        
        <ContractStatus />
        <Divider />

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