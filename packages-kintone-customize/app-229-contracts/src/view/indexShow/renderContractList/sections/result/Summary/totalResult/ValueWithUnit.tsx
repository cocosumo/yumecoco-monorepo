import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ValueWithUnit = ({
  value,
  unit = '円',
}:{
  value: number,
  unit: string
}) => {
  
  return (
    <>
      <Typography 
        component={'span'}
        fontSize={24}
      >
        {value.toLocaleString()}
      </Typography>
      <Typography
        fontSize={12}
        color={grey[500]}
        component={'span'}
        ml={1}
      >
        {unit}
      </Typography>
    </>
  );
};