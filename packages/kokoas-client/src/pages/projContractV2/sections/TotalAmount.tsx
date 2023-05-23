import { Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';
import { ProfitRate } from '../fields/ProfitRate';

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
      <ControlledCurrencyInput disabled={disabled} name="totalContractAmtAfterTax" label="契約合計金額（税込）" />
      <ControlledCurrencyInput disabled={disabled} name="totalContractAmtBeforeTax" label="契約合計金額（税抜）" />

      <ProfitRate disabled={disabled} />
      <ControlledCurrencyInput disabled={disabled} name="totalProfit" label="粗利額 （税抜）" />
    </Stack>
  );
};
