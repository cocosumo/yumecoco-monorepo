import { Box, Button, Collapse } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';


/** 保存 */
export const BtnSave = ({
  handleSave, throttle,
}: {
  throttle: boolean,
  handleSave: ()=>void
}) => {

  const [showText, setShowText] = useState(false);

  return (
    <Button
      variant={'contained'}
      size="medium"
      aria-label="save"
      color={'primary'}
      sx={{ opacity: showText ? 1 : 0.5 }}
      onMouseEnter={()=>setShowText(true)}
      onMouseLeave={()=>setShowText(false)}
      onClick={handleSave}
      disabled={throttle}
    >
      <SaveIcon />

      <Collapse in={showText} orientation={'horizontal'}
        mountOnEnter unmountOnExit
      >
        <Box ml={1} width={'40px'}>
          {throttle && showText  ? '保存中' : '保存'}
        </Box>
      </Collapse>



    </Button>


  );
};