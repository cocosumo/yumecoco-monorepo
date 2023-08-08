import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useSubmitHandler } from '../../hooks/useSubmitHandler';
import { PreviewButton } from '../../parts/preview/PreviewButton';
import { ReportButton } from './ReportButton';


export const CommonActions = () => {

  const handleSubmit = useSubmitHandler();
  const {
    formState,
    control,
  } = useFormContext<TypeOfForm>();

  const {
    isDirty,
  } = formState;
    

  const [
    contractId,
  ] = useWatch({
    control,
    name: [
      'contractId',
    ],
  });
  

  return (
    <Stack
      direction="row"
      spacing={2}
      py={2}
      alignItems={'center'}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        保存
      </Button>

      {contractId && (
        <PreviewButton disabled={isDirty} />
      )}

      <ReportButton />

    </Stack>
  );
};