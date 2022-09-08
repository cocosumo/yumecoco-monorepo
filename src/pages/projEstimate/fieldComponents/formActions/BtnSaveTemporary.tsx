import { Box, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
/** 一時保存 */
export const BtnSaveTemporary = ({
  handleSave, throttle,
}: {
  throttle: boolean,
  handleSave: ()=>void
}) => {

  return (
    <Button
      variant={'outlined'}
      size="medium"
      aria-label="cancel"
      color={'secondary'}
      onClick={handleSave}
      disabled={throttle}
    >
      <SaveAltIcon />
      <Box ml={1} width={'60px'}>
        一時保存
      </Box>

    </Button>
  );
};