import { TextField } from '@mui/material';
import { useField } from 'formik';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { getPayFieldName } from '../../form';

export const PaymentFieldDate = ({
  disabled,
  idx,
} : {
  disabled: boolean,
  idx: number
}) => {
  const [field] = useField(getPayFieldName('date', idx));
  const { value, onChange } = field;

  return (
    <JADatePicker
      disabled={disabled}
      value={value}
      onChange={()=>{}}
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          variant={'standard'}
        />)}
    />
  );
};