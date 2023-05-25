import { Divider, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Info } from './Info';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';

export const AmountDetails = () => {
  const [
    totalContractAmtAfterTax,
    totalContractAmtBeforeTax,
  ]  = useWatch<TypeOfForm>({
    name: [
      'totalContractAmtAfterTax',
      'totalContractAmtBeforeTax',
    ],
    
  }) as number[];


  const taxValue = totalContractAmtAfterTax - totalContractAmtBeforeTax;
 
  const data = [
    { label: '消費税', value: `${taxValue.toLocaleString()} 円` },
  ];

  return (
    <Stack 
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
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