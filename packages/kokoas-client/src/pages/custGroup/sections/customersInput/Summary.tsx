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
      <Typography 
        fontWeight={'bold'}
        color={'text.secondary'}
        fontSize={18}
        sx={{ width: 100 }}
      >
        {label}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        {custName}
      </Typography>
              
    </Stack>
  );
};