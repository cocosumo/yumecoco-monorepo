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

  const methods = useForm<TypeOfForm>({
    defaultValues: {
      ...initialValues,
      ...urlParams,
      amountTo: amountTo ?? maxAmount, // URLで金額範囲を指定していなければ、最大値を設定する。
      amountFrom: amountFrom ?? minAmount, // ″、最小値を設定する。
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