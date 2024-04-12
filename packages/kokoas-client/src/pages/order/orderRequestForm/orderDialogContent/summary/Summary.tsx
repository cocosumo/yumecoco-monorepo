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
    groupedByTaxArray,
    totalTaxAmount,
    nonTaxableAmount,
    totalAmount,
  } = useSummary();

  return (
    <Stack spacing={1}>
      {groupedByTaxArray.length 
        ? (
          groupedByTaxArray.map(([taxRate, amount]) => (
            <LabeledInfo key={taxRate} label={`小計 ${taxRate}%対象`} value={amount} />
          ))
        ) 
        : (
          <LabeledInfo label={'小計 課税'} value={0} />
        )}
      <LabeledInfo label={'消費税'} value={totalTaxAmount} />
      <LabeledInfo label={'非課税'} value={nonTaxableAmount} />
      <LabeledInfo label={'合計'} value={totalAmount} />
    </Stack>
  );
};