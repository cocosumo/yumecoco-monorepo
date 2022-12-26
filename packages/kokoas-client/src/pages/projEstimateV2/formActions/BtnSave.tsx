import { Box, Button, Collapse } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

//import { useFormikContext } from 'formik';
//import { TypeOfForm } from '../../form';


/** 保存 */
export const BtnSave = () => {

  const [showText, setShowText] = useState(false);

  return (
    <Button
      type='submit'
      variant={'contained'}
      size="medium"
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


  );
};