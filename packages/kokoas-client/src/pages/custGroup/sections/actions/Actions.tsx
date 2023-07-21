import { Alert, Button, Paper, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { RelatedProjButton } from './RelatedProjButton';
import { DeleteButton } from './DeleteButton';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useReset } from '../../hooks/useReset';

export const Actions = () => {
  const { 
    formState: {
      isDirty,
    },
  } = useTypedFormContext();

  const handleReset  = useReset();

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
            onClick={handleReset}
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
        </Stack>
      
        <DeleteButton disabled={isDirty} />
      </Stack>

    </Stack>
  );
};