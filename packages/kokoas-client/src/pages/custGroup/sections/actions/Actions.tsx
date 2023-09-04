import { Alert, Button, Paper, Stack, Tooltip } from '@mui/material';
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

  const [
    isDeleted,
    custGroupId,
  ] = useTypedWatch({
    name: [
      'isDeleted',
      'custGroupId',
    ],
  });

  const handleReset  = useReset();

  return (
    <Stack
      spacing={1}
    >
      {isDirty && (
      <Alert 
        severity='warning'
        action={(
          <Tooltip title={'最後に保存した状態に戻ります。'}>
            <Button
              color='inherit'
              size='small'
              onClick={handleReset}
            >
              リセット
            </Button>
     
          </Tooltip>)}
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
          
          {!!custGroupId && (
          <RelatedProjButton 
            disabled={isDirty}
            custGroupId={custGroupId as string}
          />
          )}
 
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