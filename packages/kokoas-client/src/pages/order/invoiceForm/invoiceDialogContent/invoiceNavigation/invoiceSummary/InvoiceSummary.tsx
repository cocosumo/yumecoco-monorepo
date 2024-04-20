import { Stack } from '@mui/material';
import { SummaryInfo } from './SummaryInfo';


export const InvoiceSummary = () => {
  
  return (
    <Stack
      spacing={2}
      p={2}
      // add top shadow
      boxShadow={'0px -2px 4px rgba(0, 0, 0, 0.1)'}
      zIndex={1}
      bgcolor={'#fff'}
    >
      <SummaryInfo label={'合計（税抜）'} value={10000000} />
      <SummaryInfo label={'請求残（税抜）'} value={5000000} />
    </Stack>
  );
};