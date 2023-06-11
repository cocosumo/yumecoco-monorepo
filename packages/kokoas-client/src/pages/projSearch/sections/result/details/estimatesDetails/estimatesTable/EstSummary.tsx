import { Divider, Stack, Typography } from '@mui/material';

const SummaryItem = ({
  label,
  value,
}:{
  label: string,
  value: string,
}) => {
  return (
    <Stack spacing={1} textAlign={'right'}>
      <Typography>
        {label}
      </Typography>
      <Typography>
        {value}
      </Typography>

    </Stack>
  );
};

export const EstSummary = () => {
  return (
    <Stack
      p={2} 
      spacing={2}
      direction={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      divider={<Divider />}
    >
      <SummaryItem 
        label='原価合計'
        value={`${(100000).toLocaleString()} 円`}
      />
      <SummaryItem 
        label='原価合計'
        value={`${(100000).toLocaleString()} 円`}
      />
      <SummaryItem 
        label='原価合計'
        value={`${(100000).toLocaleString()} 円`}
      />
      <SummaryItem 
        label='原価合計'
        value={`${(100000).toLocaleString()} 円`}
      />
      <SummaryItem 
        label='原価合計'
        value={`${(100000).toLocaleString()} 円`}
      />
    </Stack>
  );
};