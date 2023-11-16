import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { Chip, Stack, Typography } from '@mui/material';

export const TaxAmount = () => {

  const [
    totalContractAmtAfterTax,
    totalContractAmtBeforeTax,
  ] = useWatch<TypeOfForm>({
    name: [
      'totalContractAmtAfterTax',
      'totalContractAmtBeforeTax',
    ],

  }) as number[];


  const taxValue = totalContractAmtAfterTax - totalContractAmtBeforeTax;
  return (
    <Chip
      sx={{
        '& .MuiChip-label': {
          width: '100%',
        },
        width: 300,
      }}
      label={<Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <div>
          消費税
        </div>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-around'}
          spacing={1.5}
        >
          <Typography color={taxValue >= 0 ? 'black' : 'orange'}>
            {`${taxValue.toLocaleString()} `}
          </Typography>
          <div>
            円
          </div>
        </Stack>
      </Stack>}
    />
  );
};