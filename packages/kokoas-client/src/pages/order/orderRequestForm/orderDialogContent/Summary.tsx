import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const LabeledInfo = ({
  label,
  value,
  fontSize = 18,
}:{
  label: string,
  value: number,
  fontSize?: number,
}) => {
  return (
    <Stack 
      direction={'row'} 
      justifyContent={'space-between'}
      alignItems={'center'}
      minWidth={280}
    >
      <Typography fontSize={12} color={grey[500]} component={'span'}>
        {label}
      </Typography>
      <Typography 
        fontSize={fontSize} 
        fontWeight={'bold'}
        component={'span'}
        align='right'
        color={grey[800]}
      >
        {`${value.toLocaleString()} 円` || '-'}
      </Typography>
    </Stack>
  );
};

export const Summary = () => {
  return (
    <Stack spacing={1}>
      <LabeledInfo label={'小計'} value={1000000} />
      <LabeledInfo label={'消費税'} value={100000} />
      <LabeledInfo label={'税込'} value={1100000} />
    </Stack>
  );
};