import { Alert, AlertTitle, Stack, Button } from '@mui/material';
import { ControlledCurrencyInput } from '../fields/ControlledCurrencyInput';
import { ProfitRate } from '../fields/ProfitRate';
import { TaxRate } from '../fields/TaxRate';
import { TaxAmount } from '../parts/TaxAmount';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { pages } from '../../Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

/**
 * 合計金額
 * @returns 
 */
export const TotalAmount = ({
  disabled,
}: {
  disabled: boolean
}) => {
  const projEstimateId = useWatch<TypeOfForm>({
    name: 'projEstimateId',
  }) as string;

  const hasEstimate = !!projEstimateId;

  return (
    <>
      {hasEstimate && (
      <Alert 
        severity='info'
        action={(
          <Button 
            color='inherit' 
            size='small'
            href={`#${pages.projEstimate}?${generateParams({ projEstimateId })}`}
          >
            見積書を編集
          </Button>
          )}
      >
        <AlertTitle>
          見積書からのデータ
        </AlertTitle>
        見積書から紐づいています。金額の編集は右のボタンから見積書を編集してください。
        </Alert>
      )}
      <Stack
        maxWidth={'450px'}
        width={'100%'} 
        spacing={2}
        mb={2}
      >

        <TaxRate disabled={disabled || hasEstimate} />
        <ControlledCurrencyInput disabled={disabled || hasEstimate} name="totalContractAmtAfterTax" label="契約合計金額（税込）" />
        <ControlledCurrencyInput disabled={disabled || hasEstimate} name="totalContractAmtBeforeTax" label="契約合計金額（税抜）" />
        <TaxAmount />
        <ControlledCurrencyInput disabled={hasEstimate} name="costPrice" label="原価" />
        <ControlledCurrencyInput disabled={hasEstimate} name="totalProfit" label="粗利額 （税抜）" />
        <ProfitRate disabled={hasEstimate} />

      </Stack>
    
    </>
   
  );
};
