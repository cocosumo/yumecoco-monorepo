import { Divider, Stack, Typography } from '@mui/material';
import { CompleteEstimateSummary } from 'api-kintone';

const SummaryItem = ({
  label,
  value,
}:{
  label: string,
  value: string,
}) => {
  return (
    <Stack spacing={1} textAlign={'right'}>
      <Typography>
        {label}
      </Typography>
      <Typography>
        {value}
      </Typography>

    </Stack>
  );
};

export const EstSummary = ({
  summary,
}:{
  summary: CompleteEstimateSummary
}) => {

  const {
    totalCostPrice,
    totalProfit,
    overallProfitRate,
    totalTaxAmount,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  } = summary;

  return (
    <Stack
      p={2} 
      spacing={2}
      direction={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      divider={<Divider />}
    >
      <SummaryItem 
        label='原価合計'
        value={`${totalCostPrice.toLocaleString()}`}
      />
      <SummaryItem 
        label='粗利'
        value={`${totalProfit.toLocaleString()}`}
      />
      <SummaryItem 
        label='粗利率'
        value={`${(overallProfitRate * 100).toLocaleString()} %`}
      />
      <SummaryItem 
        label='税（円）'
        value={`${totalTaxAmount.toLocaleString()}`}
      />
      <SummaryItem 
        label='税抜金額'
        value={`${totalAmountBeforeTax.toLocaleString()}`}
      />
      <SummaryItem 
        label='税込金額'
        value={`${totalAmountAfterTax.toLocaleString()}`}
      />
    </Stack>
  );
};