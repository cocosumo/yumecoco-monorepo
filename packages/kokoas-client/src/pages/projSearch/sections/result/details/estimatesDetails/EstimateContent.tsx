import { Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';

export const EstimateContent = (props: EstTableProps) => {
  return (
    <Stack width={'100%'}>
      <EstimatesTable {...props} />
    </Stack>
  );
};