import { Divider, Stack, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TForm } from '../schema';
import { blue, green, grey } from '@mui/material/colors';
import { useMemo } from 'react';
import { calcProfitRate, roundTo } from 'libs';

const SummaryContent = ({
  label,
  value,
}:{
  label: string;
  value: string;
}) => {
  return (
    <Stack 
      py={1}
      width={'100%'}
    >
      <Typography textAlign={'center'} fontSize={12} color={grey[600]}>
        {label}
      </Typography>
      <Typography textAlign={'center'} fontSize={16}>
        {value}
      </Typography>
    </Stack>
  );
};

export const Summary = () => {
  const items = useWatch<TForm>({
    name: 'items',
  }) as TForm['items'];

  const {
    totalAmountBeforeTax,
    totalAmountAfterTax,
    totalCostPrice,
    totalProfit,
  } = useMemo(() => {
    return items.reduce( (acc, cur) => { 
      const {
        rowUnitPriceBeforeTax,
        rowUnitPriceAfterTax,
        rowCostPrice,
        quantity,
      } = cur;

      if (!+quantity) return acc;

      acc.totalAmountBeforeTax += rowUnitPriceBeforeTax;
      acc.totalAmountAfterTax += rowUnitPriceAfterTax;
      acc.totalCostPrice += rowCostPrice;
      acc.totalProfit += (rowUnitPriceBeforeTax - rowCostPrice);
      return acc;
    }, {
      totalAmountBeforeTax: 0,
      totalAmountAfterTax: 0,
      totalCostPrice: 0,
      totalProfit: 0,
    });
  }, [items]);

  

  return (
    <Stack 
      bgcolor={'red'} 
      direction={'row'}
      justifyContent={'space-between'}
      divider={<Divider color={grey[200]} orientation={'vertical'} flexItem />}
      sx={{
        '& div:nth-of-type(odd)': {
          bgcolor: blue[50],
        },
        '& div:nth-of-type(even)': {
          bgcolor: green[50],
        },
        border: 2,
        borderColor: grey[300],
      }}
    >
      <SummaryContent
        label='税抜金額'
        value={roundTo(totalAmountBeforeTax).toLocaleString()}
      />
      <SummaryContent
        label='消費税'
        value={roundTo(totalAmountAfterTax - totalAmountBeforeTax).toLocaleString()}
      />
      <SummaryContent
        label='税込金額'
        value={roundTo(totalAmountAfterTax).toLocaleString()}
      />
      <SummaryContent
        label='原価'
        value={roundTo(totalCostPrice).toLocaleString()}
      />
      <SummaryContent
        label='粗利'
        value={roundTo(totalProfit).toLocaleString()}
      />
      <SummaryContent
        label='粗利率'
        value={`${roundTo((calcProfitRate(totalCostPrice, totalAmountBeforeTax) * 100), 2).toFixed(2)} %`}
      />
    </Stack>
  );
};