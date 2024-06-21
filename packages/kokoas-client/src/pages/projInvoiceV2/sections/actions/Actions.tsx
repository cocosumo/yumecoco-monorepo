import { Stack } from '@mui/material';
import { SaveInvoice } from './SaveInvoice';
import { IssueInvoice } from './IssueInvoice';
import { ReissueInvoice } from './ReissueInvoice';
import { DeleteInvoice } from './DeleteInvoice';

export const Actions = () => {



  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack
        spacing={2}
        direction={'row'}
      >
        <SaveInvoice />
        <IssueInvoice />
        <ReissueInvoice />
      </Stack>

      <DeleteInvoice />
    </Stack>
  );
};
