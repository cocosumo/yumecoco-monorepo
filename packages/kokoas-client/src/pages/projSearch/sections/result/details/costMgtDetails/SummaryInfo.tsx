import { Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';

const SummaryValue = ({
  value,
  suffix,
}:{
  value: number
  suffix: string
}) => {
  return (
    <span>
      <Typography
        fontWeight={600}
        color={value >= 0 ? grey[900] : red[500]}
        textAlign='right'
        component={'span'}
        whiteSpace={'nowrap'}
      >
        {value.toLocaleString()}
      </Typography>
      <Typography
        color={grey[500]}
        fontSize={12}
        component={'span'}
        ml={0.5}
      >
        {suffix}
      </Typography>
    </span>
  );
};

export const SummaryInfo = ({
  label,
  value,
  secondaryValue,
  suffix = '円',
  secondarySuffix = '円',
}:{
  label: string
  value: number
  secondaryValue?: number
  suffix?: string
  secondarySuffix?: string
}) => {

  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      direction='row'
      whiteSpace={'nowrap'}
      spacing={2}
    >
      <Typography
        color={grey[500]}
        component={'span'}
      >
        {label}
      </Typography>
      <Stack 
        spacing={2} 
        direction={'row'}
      >
        <SummaryValue 
          value={value}
          suffix={suffix}
        />

        {secondaryValue && (
        <SummaryValue 
          value={secondaryValue}
          suffix={secondarySuffix}
        />
        )}

      </Stack>
    </Stack>);

};