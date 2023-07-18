import {  FormGroup, FormHelperText, Stack } from '@mui/material';
import { ControlledNumberInput } from './ControlledNumberInput';

export const Birthdate = ({
  index,
}:{
  index: number,
}) => {
  
  return (
    <FormGroup>
      <Stack direction='row' width={300}>
        <ControlledNumberInput
          index={index}
          name='birthYear'
          prefix='西暦'
          suffix={'年'}
          width={150}
          borderRadius='4px 0 0 4px'
        />
        <ControlledNumberInput
          index={index}
          name='birthMonth'
          suffix={'月'}
          borderRadius='0'
        />
        <ControlledNumberInput
          index={index}
          name='birthDay'
          suffix={'日'}
          borderRadius='0 4px 4px 0'
        />

      </Stack>
      <FormHelperText>
        {'生年月日：<任意>個別設定可能'}
      </FormHelperText>
    </FormGroup>
    

  );
};