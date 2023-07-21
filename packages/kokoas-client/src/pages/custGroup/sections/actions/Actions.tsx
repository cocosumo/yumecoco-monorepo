import { Alert, Button, Paper, Stack } from '@mui/material';
import { SaveButton } from './SaveButton';
import { RelatedProjButton } from './RelatedProjButton';
import { DeleteButton } from './DeleteButton';
import { useTypedFormContext, useTypedWatch } from '../../hooks/useTypedHooks';
import { useReset } from '../../hooks/useReset';
import { RestoreButton } from './RestoreButton';

export const Actions = () => {
  const { 
    formState: {
      isDirty,
    },
  } = useTypedFormContext();

  const isDeleted = useTypedWatch({
    name: 'isDeleted',
  }) as boolean;

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
      
        {!isDeleted && (
          <DeleteButton disabled={isDirty} />
        )}
        {isDeleted && (
          <RestoreButton disabled={isDirty} />
        )}
      </Stack>

    </Stack>
  );
};