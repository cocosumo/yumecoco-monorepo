import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { Chip, Stack } from '@mui/material';

export const TaxAmount = () => {

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
  return (
    <Chip 
      sx={{
        '& .MuiChip-label' : {
          width: '100%',
        },
      }}
      label={<Stack direction={'row'} justifyContent={'space-between'}>
        <div>
          消費税
        </div>
        <div>
          {`${taxValue.toLocaleString()} 円`}
        </div>
      </Stack>}
    /> 
  );
};