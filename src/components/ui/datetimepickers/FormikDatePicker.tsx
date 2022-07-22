import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useField } from 'formik';
import { format } from 'date-fns';

interface DatePickerProps {
  label: string,
  name: string,
  disabled?: boolean,
}

/* TODO: Pass the state up */
export const FormikDatePicker = (props: DatePickerProps) => {
  const { disabled = false } = props;

  const [field, meta, helpers] = useField(props);

  const handleAccept = (date: Date) => {
    helpers.setValue(format(date, 'yyyy-MM-dd'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <DatePicker
        disabled={disabled}
        label={props.label}
        value={field.value}
        onAccept={handleAccept}
        onChange={()=>{}}
        renderInput={(params) =>
          <TextField
          {...params}
          error={!!meta.error}
          helperText={meta.error}
          fullWidth
        />}
      />

    </LocalizationProvider>
  );
};