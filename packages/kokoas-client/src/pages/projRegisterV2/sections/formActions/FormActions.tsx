import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from '../../api/convertToKintone';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useNavigate } from 'react-router-dom';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const FormActions = () => {
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    getValues,
  } = useTypedFormContext();

  const { mutateAsync } = useSaveProject();

  const handleSave = handleSubmit(
    async (data) => {
      const record = convertToKintone(data);
      const projId = getValues('projId');
      const resp = await mutateAsync({
        record,
        projId,
      });
      
      navigate(`${pages.projEditV2}?${generateParams({
        projId: resp.id,
      })}`);
    },
    (errors) => {
      console.warn(errors); // 保存できない原因で、残す
      setSnackState({
        open: true,
        message: '入力内容に不備があります', 
        severity: 'error',
        
      });
    },
  );

  return (
    <Stack direction={'row'} spacing={2}>
      <Button
        startIcon={<SaveIcon />}
        variant='contained'
        onClick={handleSave}
      >
        保存
      </Button>
    </Stack>
  );
};