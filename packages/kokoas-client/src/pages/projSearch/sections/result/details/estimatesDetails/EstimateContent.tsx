import { Stack } from '@mui/material';
import { EstimatesTable } from './estimatesTable/EstimatesTable';
import { EstTableBodyProps } from './estimatesTable/EstTableBody';

export const EstimateContent = (props: EstTableBodyProps) => {
  return (
    <Stack ml={2} width={'100%'}>
      <EstimatesTable {...props} />
    </Stack>
  );
};