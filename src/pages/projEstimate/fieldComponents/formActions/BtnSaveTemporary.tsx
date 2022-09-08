import { Box, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
/** 一時保存 */
export const BtnSaveTemporary = () => {

  const { submitForm } = useFormikContext<TypeOfForm>();

  return (
    <Button
      variant={'outlined'}
      size="medium"
      aria-label="cancel"
      color={'secondary'}
      onClick={submitForm}
    >
      <SaveAltIcon />
      <Box ml={1} width={'60px'}>
        一時保存
      </Box>

    </Button>
  );
};