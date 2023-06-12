import { Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';

export const EstimateContent = (props: EstTableProps) => {
  return (
    <Stack ml={2} width={'100%'}>
      <EstimatesTable {...props} />
    </Stack>
  );
};