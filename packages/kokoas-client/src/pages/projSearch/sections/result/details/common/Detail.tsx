import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';

export const Detail = ({
  label,
  value,
  fonstSize,
}: IDetail) => (        
  <Stack direction={'row'}>
    <Typography color={grey[600]} width={'20%'}>
      {label}
    </Typography>
    <Typography 
      width={'80%'}
      fontSize={fonstSize}
    >
      {value}
    </Typography>
  </Stack>
);