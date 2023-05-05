import { Box, FormLabel, Stack } from '@mui/material';
import { TypeOfForm } from '../../form';
import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useFormContext } from 'react-hook-form';
import { grey } from '@mui/material/colors';
import { AmountRangeSlider } from './AmountRangeSlider';


export const AmountRange = ({
  minAmount,
  maxAmount,
}: {
  minAmount: number,
  maxAmount: number,
}) => {

  const {
    register,
    formState: {
      errors: {
        amountFrom,
        amountTo,
      },
    },
  } = useFormContext<TypeOfForm>();

  const errorMessage = (amountFrom || amountTo)?.message;
  const isError = !!errorMessage;

  return (
    <Box mt={2}>
      <FormLabel error={isError}>
        金額
      </FormLabel>
      <Box px={4}>
        <AmountRangeSlider
          min={minAmount}
          max={maxAmount}
        />
      </Box>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <OutlinedMoneyInput
          fullWidth
          error={isError}
          {...register('amountFrom')}
        />
        <DoubleArrowIcon htmlColor={grey[700]} />
        <OutlinedMoneyInput
          fullWidth
          error={isError}
          {...register('amountTo')}
        />
      </Stack>

    </Box>

  );
};