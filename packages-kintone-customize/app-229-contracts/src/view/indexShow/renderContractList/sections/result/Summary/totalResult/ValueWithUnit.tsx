import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { roundTo } from 'libs';

export const ValueWithUnit = ({
  value,
  unit = '円',
  width,
}:{
  value: number,
  unit: string
  width?: string,
}) => {
  
  return (
    <Stack
      direction={'row'}
      spacing={1}
      justifyContent={'flex-end'}
      alignItems={'baseline'}
      width={width}
    >
      <Typography 
        component={'span'}
        fontSize={18}
        color={grey[700]}
        letterSpacing={2}
      >
        {roundTo(value).toLocaleString()}
      </Typography>
      <Typography
        fontSize={14}
        color={grey[500]}
        component={'span'}
      >
        {unit}
      </Typography>
    </Stack>
  );
};