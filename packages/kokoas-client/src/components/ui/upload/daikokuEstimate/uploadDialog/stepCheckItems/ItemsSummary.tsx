import { Stack } from '@mui/material';
import {  calculateEstimateSummary } from 'api-kintone';
import { roundTo } from 'libs';
import { ItemsSummaryCell } from './ItemsSummaryCell';

export const ItemsSummary = ({
  summary,
}: {
  summary: ReturnType<typeof calculateEstimateSummary>
}) => {
  const {
    overallProfitRate,
    totalAmountAfterTax,
    totalAmountBeforeTax,
    totalCostPrice,
    totalProfit,
    totalTaxAmount,
  } = summary;
  return (
    <Stack
      direction={'row'}
      width={'80%'}
      minWidth={500}
      spacing={1}
      justifyContent={'space-between'}
    >
      <ItemsSummaryCell
        header={'御見積金額'}
        value={`${totalAmountBeforeTax.toLocaleString()} 円`}
      />
      <ItemsSummaryCell
        header={'消費税 ( 10% )'}
        value={`${totalTaxAmount.toLocaleString()} 円`}
      />
      <ItemsSummaryCell
        header={'御見積合計'}
        value={`${totalAmountAfterTax.toLocaleString()} 円`}
      />
      <ItemsSummaryCell
        header={'原価'}
        value={`${totalCostPrice.toLocaleString()} 円`}
      />
      <ItemsSummaryCell
        header={'粗利'}
        value={`${totalProfit.toLocaleString()} 円`}
      />
      <ItemsSummaryCell
        header={'粗利率'}
        value={`${(roundTo(overallProfitRate * 100)).toLocaleString()} %`}
      />
    </Stack>
  );

};