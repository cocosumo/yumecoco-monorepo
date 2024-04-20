import { Stack } from '@mui/material';
import { SummaryInfo } from './SummaryInfo';


export const InvoiceSummary = () => {
  
  return (
    <Stack
      borderTop={'1px solid #e0e0e0'}
      spacing={2}
      p={2}
    >
      <SummaryInfo label={'合計（税抜）'} value={10000000} />
      <SummaryInfo label={'請求残（税抜）'} value={5000000} />
    </Stack>
  );
};