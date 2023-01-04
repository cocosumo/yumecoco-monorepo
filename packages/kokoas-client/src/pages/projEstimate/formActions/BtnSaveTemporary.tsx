import { Box, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { HotKeyTooltip } from 'kokoas-client/src/components';
import { SaveButtonNames } from '../hooks/useSaveForm';

/** 一時保存 */
export const BtnSaveTemporary = () => {
  const name : SaveButtonNames = 'temporary';

  return (

    <HotKeyTooltip title={'ctrl + s'}>
      <Button
        name={name}
        type='submit'
        variant={'outlined'}
        size="medium"
        aria-label="cancel"
        color={'secondary'}
      >
        <SaveAltIcon />
        <Box ml={1} width={'60px'}>
          一時保存
        </Box>

      </Button>
    </HotKeyTooltip>
  );
};