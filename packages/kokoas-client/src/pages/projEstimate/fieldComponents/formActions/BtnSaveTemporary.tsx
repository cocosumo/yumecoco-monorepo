import { Box, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { HotKeyTooltip } from 'kokoas-client/src/components';

/** 一時保存 */
export const BtnSaveTemporary = () => {

  const { submitForm, setValues } = useFormikContext<TypeOfForm>();

  const handleSave = () => {

    setValues(prev => ({ ...prev, saveMode: 'temporary' }));
    submitForm();
  };

  return (

    <HotKeyTooltip title={'ctrl + s'}>
      <Button
        variant={'outlined'}
        size="medium"
        aria-label="cancel"
        color={'secondary'}
        onClick={handleSave}
      >
        <SaveAltIcon />
        <Box ml={1} width={'60px'}>
          一時保存
        </Box>

      </Button>
    </HotKeyTooltip>
  );
};