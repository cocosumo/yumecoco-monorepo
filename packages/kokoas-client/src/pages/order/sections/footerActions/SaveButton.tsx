import { Alert, Button, Fade, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSaveForm } from '../../hooks/useSaveForm';
import { useSaveHotkey } from '../../hooks/useSaveHotkey';
import { useFormState } from 'react-hook-form';
import { useConfirmBeforeClose } from 'kokoas-client/src/hooks/useConfirmBeforeClose';

export const SaveButton = () => {

  const { handleSubmit, control } = useSaveForm();
  useSaveHotkey(handleSubmit, { disabled: false });

  const {
    isDirty,
  } = useFormState({ control });

  useConfirmBeforeClose({
    open: isDirty,
  });

  return (
    <Stack 
      direction={'row'}
      spacing={2}
      alignItems={'center'}
    >

      <Button
        variant='contained'
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        保存
      </Button>

      <Fade in={isDirty}>
        <Alert severity={'warning'}>
          未保存の変更があります
        </Alert>
      </Fade>

    </Stack>
  );
};