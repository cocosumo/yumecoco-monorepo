import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface InfoFieldsProps {
  label: string;
  value: number;
}

export const InfoFields = ({ 
  label, 
  value,
}: InfoFieldsProps) => {


  return (
    <Stack 
      direction='row'
      pr={'14px'}
      height={'37.44px'}
    >

      <Typography 
        color={grey[600]} 
        component={'span'} 
        my={'auto'}
      >
        {label}
      </Typography>

      <Typography 
        flexGrow={1} 
        textAlign={'right'} 
        component={'span'}
        my={'auto'}
      >
        {value.toLocaleString()}
      </Typography>
      
      <Typography 
        color={grey[500]} 
        ml={'6px'} 
        my={'auto'}
        component={'span'}
      >
        円
      </Typography>

    </Stack>
  );
};