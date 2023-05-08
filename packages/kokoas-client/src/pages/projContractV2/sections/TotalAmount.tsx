import { Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';

/**
 * 合計金額
 * @returns 
 */
export const TotalAmount = ({
  disabled,
}: {
  disabled: boolean
}) => {

  return (
    <Stack maxWidth={450} width={'100%'} spacing={2}
      my={2}
    >
      <ControlledCurrencyInput disabled={disabled} name="totalContractAmt" label="契約合計金額" />
      <ControlledCurrencyInput disabled={disabled} name="totalProfit" label="粗利額" />
    </Stack>
  );
};
