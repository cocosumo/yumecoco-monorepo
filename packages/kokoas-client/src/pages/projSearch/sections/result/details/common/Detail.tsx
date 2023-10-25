import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';

export const Detail = ({
  label,
  value,
  fonstSize,
  isSubtle,
}: IDetail) => (
  <Stack
    direction={'row'}
    sx={{
      ':hover': {
        backgroundColor: grey[100],
      },
    }}
  >
    <Typography
      color={grey[600]}
      width={'15%'}
      component={'div'}
      px={2}
      fontSize={isSubtle ? 8 : 14}
    >
      {label}
    </Typography>
    <Typography
      width={'75%'}
      color={isSubtle ? grey[600] : undefined}
      fontSize={isSubtle ? 8 : fonstSize}
      component={'div'}
    >
      {value}
    </Typography>
  </Stack>
);