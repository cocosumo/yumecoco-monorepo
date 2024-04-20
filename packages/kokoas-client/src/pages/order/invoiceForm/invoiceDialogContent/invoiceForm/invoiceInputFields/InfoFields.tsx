import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface InfoFieldsProps {
  label: string;
}

export const InfoFields = ({ 
  label, 
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
        1,000,000
      </Typography>
      
      <Typography 
        color={grey[500]} 
        ml={2} 
        component={'span'}
        my={'auto'}
      >
        円
      </Typography>

    </Stack>
  );
};