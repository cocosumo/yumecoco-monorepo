import { FormControl, FormLabel, Stack } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { KeyOfForm } from '../../form';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';


export const AmountRange = () => {
  const [fromField, toField ]: KeyOfForm[] = ['amountFrom', 'amountTo'];


  return (
    <FormControl>
      <FormLabel>
        金額
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <OutlinedMoneyInput name={fromField} />
        <DoubleArrowIcon />
        <OutlinedMoneyInput name={toField} />
      </Stack>

    </FormControl>

  );
};