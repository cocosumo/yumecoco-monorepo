import { Typography } from '@mui/material';


export const Display = ({
  value, suffix,
}: {
  value: number,
  suffix?: string
}) => {

  return (
    <Typography variant='body2'>
      {Math.round(value).toLocaleString()}
      {suffix}
    </Typography>
  );
};