import { FormControl, FormLabel, Stack } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { KeyOfForm } from '../../form';
import { FormikMoneyField } from '../../../../components/ui/textfield/FormikMoneyField';


export const AmountRange = () => {
  const [fromField, toField ]: KeyOfForm[] = ['amountFrom', 'amountTo'];


  return (
    <FormControl>
      <FormLabel>
        金額
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <FormikMoneyField label={''} name={fromField} />
        <DoubleArrowIcon />
        <FormikMoneyField label={''} name={toField} />
      </Stack>

    </FormControl>

  );
};