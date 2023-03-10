import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ComponentProps, forwardRef, Ref } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


/**
 * Japanese format date picker.
 *
 * @param props
 * @returns
 */
export const JADatePicker = forwardRef(( datePickerProps: ComponentProps<typeof DatePicker>, ref) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <DatePicker
        {...datePickerProps}
        inputRef={ref as Ref<HTMLInputElement>}
      />

    </LocalizationProvider>
  );
});

JADatePicker.displayName = 'JADatePicker';