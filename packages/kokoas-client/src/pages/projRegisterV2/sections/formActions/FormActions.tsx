import { Button, Paper, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from '../../api/convertToKintone';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useNavigate } from 'react-router-dom';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { fieldMapJa } from '../../api/fieldMapJa';
import { KForm } from '../../schema';
import { CancelStatus } from '../cancelStatus/CancelStatus';

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
      // summarize errors into string
      const errorString = Object.entries(errors).reduce((acc, [key, value]) => {
        if (value) {
          acc += `${fieldMapJa[key as KForm]}: ${value.message}\n`;
        }
        return acc;
      }, '');

      setSnackState({
        open: true,
        message: `「${errorString}」  修正が出来ない場合はお手数ですが、管理者に連絡してください。`, 
        severity: 'error',
        
      });
    },
  );

  return (
    <Stack 
      direction={'row'} 
      justifyContent={'space-between'}
      component={Paper}
      p={1}
    >
      <Button
        startIcon={<SaveIcon />}
        variant='contained'
        onClick={handleSave}
        size='small'
      >
        保存
      </Button>
      <CancelStatus />
    </Stack>
  );
};