import { Stack, Typography } from '@mui/material';

export const Summary = ({
  label,
  custName,
}:{
  label: string,
  custName: string,
}) => {
  return (
    <Stack
      direction={'row'}
      width={'100%'}
    >
      <Typography sx={{ width: 100 }}>
        {label}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        {custName}
      </Typography>
              
    </Stack>
  );
};