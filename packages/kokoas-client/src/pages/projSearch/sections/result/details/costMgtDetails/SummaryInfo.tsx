import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const SummaryInfo = ({
  label,
  value,
  suffix = '円',
}:{
  label: string
  value: number
  suffix?: string
}) => {

  return (
    <Stack
      justifyContent='space-between'
    >
      <Typography
        color={grey[500]}
      >
        {label}
      </Typography>
      <Typography
        fontWeight={600}
        color={grey[900]}
        fontSize={18}
      >
        {value.toLocaleString()}
      </Typography>
      <Typography
        color={grey[500]}
        fontSize={12}
      >
        {suffix}
      </Typography>
    </Stack>);

};