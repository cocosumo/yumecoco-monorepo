import { Box, Button, ButtonProps } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { HotKeyTooltip } from 'kokoas-client/src/components';
import { SaveButtonNames } from '../hooks/useSaveForm';

/** 一時保存 */
export const BtnSaveTemporary = (props: ButtonProps) => {
  const name : SaveButtonNames = 'temporary';

  return (

    <HotKeyTooltip title={'ctrl + s'}>
      <Button
        {...props}
        name={name}
        variant={'outlined'}
        size="small"
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