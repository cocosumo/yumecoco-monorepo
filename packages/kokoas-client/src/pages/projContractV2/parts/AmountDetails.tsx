import { Divider, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Info } from './Info';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { calcBeforeTax, calcProfitRate } from 'libs';

export const AmountDetails = () => {
  const [
    totalContractAmt,
    totalProfit,
    taxRate,
  ]  = useWatch<TypeOfForm>({
    name: [
      'totalContractAmt',
      'totalProfit',
      'taxRate',
    ],
    
  }) as number[];

  const totalAmtBeforeTax = calcBeforeTax(totalContractAmt, taxRate);
  const costPrice = totalAmtBeforeTax - totalProfit;
  const profitRate = calcProfitRate(costPrice, totalAmtBeforeTax) * 100;

  const data = [
    { 
      label: '税率', 
      value: `${
        (taxRate * 100)
      } %`, 
    },
    { label: '税抜金額', value: `${totalAmtBeforeTax.toLocaleString()} 円` },
    { label: '原価', value: `${costPrice.toLocaleString()} 円` },
    { label: '粗利率', value: `${profitRate.toFixed(2)} %` },
  ];

  return (
    <Stack 
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
      height={'100%'}
      spacing={1}
      justifyContent={'center'}
      alignContent={'flex-end'}
      divider={<Divider />}
    >
      {data.map(({ label, value }) => (
        <Info
          key={label}
          label={label}
          value={value}
          justifyContent={'space-between'}
        />
      ))}

    </Stack>
  );
};