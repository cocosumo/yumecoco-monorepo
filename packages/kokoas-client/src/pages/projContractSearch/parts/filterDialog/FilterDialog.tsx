import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useForm } from 'react-hook-form';
import { initialValues, TypeOfForm } from '../../form';
import { AmountRange } from './AmountRange';
import { ContractDateRange } from './ContractDateRange';
import { FilterDialogContent } from './FilterDialogContent';
import { FilterForm } from './FilterForm';


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
  const urlParams = useURLParams<TypeOfForm>();
  const {
    amountFrom,
    amountTo,
  } = urlParams;

  console.log( amountFrom ?? minAmount, amountTo ?? maxAmount);

  const methods = useForm<TypeOfForm>({
    defaultValues: {
      ...initialValues,
      ...urlParams,
      amountFrom: amountFrom ?? minAmount,
      amountTo: amountTo ?? maxAmount,
    },
  });



  return (
    <FilterForm useFormMethods={methods}>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
      >
        <DialogTitle>
          絞り込み
        </DialogTitle>
        <FilterDialogContent>
          <AmountRange minAmount={minAmount} maxAmount={maxAmount} />
          <ContractDateRange />
        </FilterDialogContent>
        <DialogActions>
          <Button variant={'text'} onClick={handleClose}>
            閉じる
          </Button>
          <Button type='submit' variant={'contained'}>
            検索
          </Button>
        </DialogActions>

      </Dialog>
    </FilterForm>
  );
};