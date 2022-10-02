import { TextField } from '@mui/material';
import { useField } from 'formik';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { getPayFieldNameByIdx } from '../../form';

export const PaymentFieldDate = ({
  disabled,
  idx,
} : {
  disabled: boolean,
  idx: number
}) => {
  const [field, meta, helpers] = useField(getPayFieldNameByIdx('payDate', idx));
  const { value, name } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      disabled={disabled}
      value={value}
      disablePast
      views={['year', 'month', 'day' ]}
      onChange={(v)=>{
        setValue(v ?? '', true);
      }}
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          name={name}
          onBlur={() => setTouched(true, true)}
          variant={'standard'}
          error={isShowError}
          helperText={isShowError ? error : ''}
        />)}
    />
  );
};