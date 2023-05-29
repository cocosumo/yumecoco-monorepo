import { Stack } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';
import { ProfitRate } from '../fields/ProfitRate';
import { TaxRate } from '../fields/TaxRate';
import { TaxAmount } from '../parts/TaxAmount';

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
      <TaxRate />
      <ControlledCurrencyInput disabled={disabled} name="totalContractAmtAfterTax" label="契約合計金額（税込）" />
      <ControlledCurrencyInput disabled={disabled} name="totalContractAmtBeforeTax" label="契約合計金額（税抜）" />
      <TaxAmount />
      <ControlledCurrencyInput disabled={disabled} name="costPrice" label="原価" />
      <ControlledCurrencyInput disabled={disabled} name="totalProfit" label="粗利額 （税抜）" />
      <ProfitRate disabled={disabled} />

    </Stack>
  );
};
