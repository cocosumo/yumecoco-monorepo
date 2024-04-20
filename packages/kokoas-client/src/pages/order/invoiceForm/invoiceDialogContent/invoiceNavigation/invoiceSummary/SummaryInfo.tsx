import { Typography, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface SummaryInfoProps {
  label: string;
  value: number;
}

export const SummaryInfo = ({
  label,
  value,
}: SummaryInfoProps) => {
  return (
    <Stack>
      <Typography 
        fontSize={10} 
        color={grey[500]} 
        component={'span'}
        textAlign={'right'}
      >
        {label}
      </Typography>

      <Stack direction={'row'} spacing={1} alignItems={'baseline'}>
        <Typography 
          flexGrow={1} 
          fontSize={16} 
          align='right'
          component={'span'}
        >
          {value.toLocaleString()}
        </Typography>

        <Typography 
          fontSize={12} 
          color={grey[500]} 
          component={'span'}
        >
          円
        </Typography>
      </Stack>
      
    </Stack>
  );
};