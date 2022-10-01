import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';
import { getFieldName } from '../../form';

export const CheckboxRefund = () => {
  const [field,,helpers] = useField(getFieldName('hasRefund'));
  const { value } = field;
  const { setValue } = helpers;

  return (
    <FormControlLabel
      label={'返金あり'}
      control={(
        <Checkbox
          onChange={(_, checked) => setValue(checked, false)}
          checked={value}
          sx={{
            transform: 'scale(1.5)',
          }}
        />)}
    />
  );
};