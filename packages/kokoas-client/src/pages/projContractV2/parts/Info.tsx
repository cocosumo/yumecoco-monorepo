import { Stack, Typography } from '@mui/material';

export const Info = ({
  label,
  value,
}: {
  label: string,
  value: string,
}) => (
  <Stack 
    direction={'row'}
  >
    <Typography variant='caption' width={'20%'}>
      {label}
    </Typography>
    <Typography variant='body1' component={'span'}>
      {value}
    </Typography>
  </Stack>
);