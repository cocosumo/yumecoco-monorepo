import { Box, Button, Collapse } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

//import { useFormikContext } from 'formik';
//import { TypeOfForm } from '../../form';


/** 保存 */
export const BtnSave = () => {
  //const { submitForm, setValues } = useFormikContext<TypeOfForm>();

  const [showText, setShowText] = useState(false);

  const handleSave = () => {
    //setValues(prev => ({ ...prev, saveMode: 'normal' }));
    //submitForm();
  };

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