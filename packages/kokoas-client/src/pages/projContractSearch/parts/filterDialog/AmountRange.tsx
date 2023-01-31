import { Box, FormLabel, Stack } from '@mui/material';
import { KeyOfForm, TypeOfForm } from '../../form';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useFormContext } from 'react-hook-form';
import { grey } from '@mui/material/colors';
import { AmountRangeSlider } from './AmountRangeSlider';

const [fromField, toField ]: KeyOfForm[] = ['amountFrom', 'amountTo'];

export const AmountRange = ({
  minAmount,
  maxAmount,
}: {
  minAmount: number,
  maxAmount: number,
}) => {

  const {
    register,
  } = useFormContext<TypeOfForm>();


  return (
    <Box mt={2}>
      <FormLabel>
        金額
      </FormLabel>
      <Box px={4}>
        <AmountRangeSlider min={minAmount} max={maxAmount} />
      </Box>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <OutlinedMoneyInput fullWidth {...register(fromField)} />
        <DoubleArrowIcon htmlColor={grey[700]} />
        <OutlinedMoneyInput fullWidth {...register(toField)} />
      </Stack>

    </Box>

  );
};