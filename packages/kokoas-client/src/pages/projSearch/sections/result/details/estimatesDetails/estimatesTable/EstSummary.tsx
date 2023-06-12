import { Divider, Stack, Typography } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { TypographyProps } from '@mui/system';
import { CompleteEstimateSummary } from 'api-kintone';

const SummaryItem = ({
  label,
  value,
  valueProps,
}:{
  label: string,
  value: string,
  valueProps?: TypographyProps
}) => {
  return (
    <Stack 
      width={'100%'} 
      spacing={1} 
      textAlign={'center'}
      py={1}
    >
      <Typography color={grey[600]}>
        {label}
      </Typography>
      <Typography 
        fontSize={18} 
        color={grey[800]}
        whiteSpace={'nowrap'} 
        {...valueProps}
      >
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
      direction={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      borderTop={2}
      borderColor={grey[200]}
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        // even divs should have blue black bacground
        // odd dis should have green background
        '& > :nth-of-type(even)': {
          bgcolor: blue[50],
        },
        '& > :nth-of-type(odd)': {
          bgcolor: green[50],
        },
      }}
    >
      <SummaryItem 
        label='税抜金額'
        value={`${totalAmountBeforeTax.toLocaleString()}`}
      />
      <SummaryItem 
        label='税（円）'
        value={`${totalTaxAmount.toLocaleString()}`}
      />
      <SummaryItem 
        label='税込金額'
        value={`${totalAmountAfterTax.toLocaleString()}`}
      />
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
    </Stack>
  );
};