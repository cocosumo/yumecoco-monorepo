import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { roundTo } from 'libs';

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
        fontSize={28}
      >
        {roundTo(value).toLocaleString()}
      </Typography>
      <Typography
        fontSize={14}
        color={grey[500]}
        component={'span'}
        ml={1}
      >
        {unit}
      </Typography>
    </>
  );
};