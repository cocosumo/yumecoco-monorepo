import { Typography } from '@mui/material';


export const DisplayNumber = ({
  value, suffix,
}: {
  value: number,
  suffix?: string
}) => {

  return (
    <Typography 
      variant='body2' 
      textAlign={'right'}
      noWrap
    >
      {Math.round(value).toLocaleString()}
      {suffix}
    </Typography>
  );
};