import { Alert, Button, Paper, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { RelatedProjButton } from './RelatedProjButton';
import { RelatedContracts } from './RelatedContracts';
import { DeleteButton } from './DeleteButton';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const Actions = () => {
  const { 
    reset,
    formState: {
      isDirty,
    },
  } = useTypedFormContext();

  return (
    <Stack
      spacing={1}
    >
      {isDirty && (
      <Alert 
        severity='warning'
        action={(
          <Button
            color='inherit'
            size='small'
            onClick={() => reset()}
          >
            リセット
          </Button>)}
      >
        保存されていない変更があります。
      </Alert>
      )}
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
          <RelatedProjButton disabled={isDirty} />
          <RelatedContracts disabled={isDirty} />
        </Stack>
      
        <DeleteButton disabled={isDirty} />
      </Stack>

    </Stack>
  );
};