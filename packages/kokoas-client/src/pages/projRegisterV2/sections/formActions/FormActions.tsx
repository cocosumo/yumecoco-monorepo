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
      console.warn('ERRORS', errors); // 保存できない原因で、残す
      // summarize errors into string
      const errorString = Object.entries(errors).reduce((acc, [key, value]) => {
        let newAcc = acc;
        if (Array.isArray(value)) {
          newAcc += `${fieldMapJa[key as KForm]}：\n`;
          value.forEach((v) => {
            newAcc += `${v.message}\n`;
          });
        } else if (value) {
          const keyJa = fieldMapJa[key as KForm];
          newAcc += `${ keyJa ? `${fieldMapJa[key as KForm]}：` : ''} ${value.message}\n`;
        } 
        return newAcc;
      }, '');

      setSnackState({
        open: true,
        message: `${errorString ? errorString : 'エラーが発生しました'} 。 不具合があれば、お手数ですが、管理者に連絡してください。`, 
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
        size='large'
      >
        保存
      </Button>
      <CancelStatus />
    </Stack>
  );
};