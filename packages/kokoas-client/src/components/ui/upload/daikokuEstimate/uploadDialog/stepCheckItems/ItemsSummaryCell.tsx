import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ReactNode } from 'react';

export const ItemsSummaryCell = ({
  header,
  value,
}: {
  header: ReactNode,
  value: ReactNode,
}) => {
  return (
    <Stack>
      <Typography textAlign={'right'} fontSize={12} color={grey[400]}>
        {header}
      </Typography>
      <Typography textAlign={'right'}>
        {value}
      </Typography>
    </Stack>
  );
};