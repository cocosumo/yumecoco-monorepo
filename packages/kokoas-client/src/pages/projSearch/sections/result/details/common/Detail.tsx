import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';

export const Detail = ({
  label,
  value,
  fonstSize,
}: IDetail) => (        
  <Stack 
    direction={'row'}
    px={2}
    sx={{
      ':hover': {
        backgroundColor: grey[100],
      },
    }}
  >
    <Typography color={grey[600]} width={'15%'} component={'div'}>
      {label}
    </Typography>
    <Typography 
      width={'75%'}
      fontSize={fonstSize}
      component={'div'}
    >
      {value}
    </Typography>
  </Stack>
);