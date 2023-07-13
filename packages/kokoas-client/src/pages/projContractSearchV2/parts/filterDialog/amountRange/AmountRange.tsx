import { Box, FormLabel, Stack } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { grey } from '@mui/material/colors';
import { ControlledAmountField } from './ConrtolledAmountField';


export const AmountRange = () => {

  return (
    <Box mt={2}>
      <FormLabel>
        金額
      </FormLabel>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <ControlledAmountField name="amountFrom" />
        <DoubleArrowIcon htmlColor={grey[700]} />
        <ControlledAmountField name="amountTo" />

      </Stack>

    </Box>

  );
};