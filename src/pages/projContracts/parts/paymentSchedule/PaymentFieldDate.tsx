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
  const [field, meta, helpers] = useField(getPayFieldName('date', idx));
  const { value } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      disabled={disabled}
      value={value}
      disablePast
      views={['year', 'month', 'day' ]}
      onChange={(v)=>{
        setValue(v);
      }}
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          variant={'standard'}
          error={isShowError}
          helperText={isShowError ? error : ''}
        />)}
    />
  );
};