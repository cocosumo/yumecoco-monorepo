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
          suffix={'年'}
        />
        <ControlledNumberInput
          index={index}
          name='birthMonth'
          suffix={'月'}
        />
        <ControlledNumberInput
          index={index}
          name='birthDay'
          suffix={'日'}
        />

      </Stack>
      <FormHelperText>
        {'生年月日：<任意>個別設定可能'}
      </FormHelperText>
    </FormGroup>
    

  );
};