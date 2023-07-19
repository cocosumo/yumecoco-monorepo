import { Paper, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { RelatedProjButton } from './RelatedProjButton';
import { RelatedContracts } from './RelatedContracts';
import { DeleteButton } from './DeleteButton';

export const Actions = () => {
  return (
    <Stack
      direction={'row'}
      component={Paper}
      justifyContent={'space-between'}
      p={2}
    >
      <Stack
        direction={'row'}
        spacing={2}
      >
        <SaveButton />
        <RelatedProjButton />
        <RelatedContracts />
      </Stack>
      
      <DeleteButton />
    </Stack>
  );
};