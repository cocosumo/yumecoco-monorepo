import { Box, Button, ButtonProps, Collapse } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { SaveButtonNames } from '../hooks/useSaveForm';

/** 保存 */
export const BtnSave = (props: ButtonProps) => {

  const [showText, setShowText] = useState(false);
  const name : SaveButtonNames = 'save';

  return (
    <span>


      <Button
        {...props}
        name={name}
        variant={'contained'}
        size="small"
        aria-label="save"
        color={'primary'}
        sx={{ opacity: showText ? 1 : 0.5 }}
        onMouseEnter={()=>setShowText(true)}
        onMouseLeave={()=>setShowText(false)}
      >
        <SaveIcon />

        <Collapse in={showText} orientation={'horizontal'}
          mountOnEnter unmountOnExit
        >
          <Box ml={1} width={'40px'}>
            保存
          </Box>
        </Collapse>
      </Button>
    </span>
  );
};