import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import {  calculateEstimateSummary } from 'api-kintone';
import { roundTo } from 'libs';
import { ParsedDaikokuGenka } from 'types';
import { ItemsSummaryCell } from './ItemsSummaryCell';

export const ItemsSummary = ({
  summary,
  parsedDaikoku,
}: {
  summary: ReturnType<typeof calculateEstimateSummary>
  parsedDaikoku: ParsedDaikokuGenka
}) => {
  const {
    overallProfitRate,
    totalAmountAfterTax,
    totalAmountBeforeTax,
    totalCostPrice,
    totalProfit,
    totalTaxAmount,
  } = summary;

  const {
    overallProfitRate: dOverallProfitRate,
    totalAmountAfterTax: dTotalAmountAfterTax,
    totalBeforeAfterTax: dTotalAmountBeforeTax,
    totalCostPrice: dTotalCostPrice,
    totalProfit: dTotalProfit,
    totalTaxAmount: dTotalTaxAmount,
  } = parsedDaikoku;

  return (
    <Stack
      direction={'row'}
      width={'80%'}
      minWidth={500}
      spacing={1}
      justifyContent={'space-between'}
      border={1}
      borderRadius={2}
      borderColor={grey[100]}
      p={1}
    >
      <ItemsSummaryCell
        header={'御見積金額'}
        value={totalAmountBeforeTax}
        daikokuValue={dTotalAmountBeforeTax}
      />
      <ItemsSummaryCell
        header={'消費税 ( 10% )'}
        value={totalTaxAmount}
        daikokuValue={dTotalTaxAmount}
      />
      <ItemsSummaryCell
        header={'御見積合計'}
        value={totalAmountAfterTax}
        daikokuValue={dTotalAmountAfterTax}
      />
      <ItemsSummaryCell
        header={'原価'}
        value={totalCostPrice}
        daikokuValue={dTotalCostPrice}
      />
      <ItemsSummaryCell
        header={'粗利'}
        value={totalProfit}
        daikokuValue={dTotalProfit}
      />
      <ItemsSummaryCell
        header={'粗利率'}
        value={(roundTo(overallProfitRate * 100, 2))}
        daikokuValue={dOverallProfitRate}
        unit={'%'}
      />
    </Stack>
  );

};