import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useSummary } from './useSummary';

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

  const {
    totalAmountAfterTax,
    totalTax,
    totalAmountBeforeTax,
  } = useSummary();

  return (
    <Stack spacing={1}>
      <LabeledInfo label={'小計'} value={totalAmountBeforeTax} />
      <LabeledInfo label={'消費税'} value={totalTax} />
      <LabeledInfo label={'税込'} value={totalAmountAfterTax} />
    </Stack>
  );
};