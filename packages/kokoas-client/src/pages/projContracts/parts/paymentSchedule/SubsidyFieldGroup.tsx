import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField } from 'formik';
import { getFieldName } from '../../form';
import { ComponentProps } from 'react';
import { SubsidyAmt } from './SubsidyAmt';
import { SubsidyMethod } from './SubsidyMethod';

const fieldName = getFieldName('hasSubsidy');

export const SubsidyFieldGroup = () => {
  const [field,, helpers] = useField(fieldName);
  const { 
    value: chkValue, 
  } = field;
  const {
    setValue,
    setTouched,
  } = helpers;


  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {
    setValue(checked);
    setTouched(true);
  };
  const shouldDisable = !chkValue;
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <FormControlLabel
        label={'補助金'}
        control={(
          <Checkbox
            onChange={handleChange}
            checked={chkValue}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />

      <SubsidyAmt disabled={shouldDisable} />
      <SubsidyMethod disabled={shouldDisable} />
    </Stack>
  );
};
