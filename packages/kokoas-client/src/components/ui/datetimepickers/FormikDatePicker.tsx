import TextField, { TextFieldProps } from '@mui/material/TextField';
import jaLocale from 'date-fns/locale/ja';
import { useField } from 'formik';
import { format } from 'date-fns';
import { DatePicker } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface DatePickerProps {
  label: string,
  name: string,
  disabled?: boolean,
  size?: 'small' | 'medium'
}

/**
 * 
 * @param props 
 * @deprecated use JADatePicker instead. 
 */
export const FormikDatePicker = (props: DatePickerProps) => {
  const {
    disabled = false,
    size = 'medium',
    label,
  } = props;

  const [field, meta, helpers] = useField(props);

  const handleAccept = (date: Date) => {
    helpers.setValue(format(date, 'yyyy-MM-dd'));
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={jaLocale}>
      <DatePicker
        disabled={disabled}
        label={label}
        value={field.value ?? null}
        onAccept={handleAccept}
        onChange={()=>{}}
        renderInput={(params: TextFieldProps) =>(
          <TextField
            {...params}
            error={!!meta.error}
            helperText={meta.error}
            size={size}
            fullWidth
          />)}
      />

    </LocalizationProvider>
  );
};