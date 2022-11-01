import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikTextFieldV2 } from '../../../../components/ui/textfield/FormikTextFieldV2';
import { getFieldName, TypeOfForm } from '../../form';
import { AmountRange } from './AmountRange';
import { ContractDateRange } from './ContractDateRange';

export const FilterDialog = ({
  handleClose,
}: {
  handleClose: () => void
}) => {

  const { values } = useFormikContext<TypeOfForm>();

  const {
    isFilterOpen,
  } = values;


  return (
    <Dialog
      open={isFilterOpen}
      onClose={handleClose}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <DialogContent >
        <Stack spacing={2} mt={4}>
          <FormikTextFieldV2 label={'工事名'} name={getFieldName('projName')} />
          <AmountRange />
          <ContractDateRange />
        </Stack>
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