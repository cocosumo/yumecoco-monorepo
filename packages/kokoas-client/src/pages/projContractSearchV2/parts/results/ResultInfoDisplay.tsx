import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ResultInfoDisplay = ({
  label,
  value,
  unit,
}:{
  label: string,
  value: string | number,
  unit: string,
}) => {

  return (
    <Stack
      direction={'row'}
      spacing={0.5}
      alignItems={'baseline'}
    >
      <Typography 
        color={grey[600]}
      >
        {`${label}：`}
      </Typography>
      <Typography 
        fontWeight={'bold'}
      >
        {value}
      </Typography>
      <Typography 
        color={grey[600]}
        fontSize={12}
      >
        {unit}
      </Typography>

    </Stack>
  );
};