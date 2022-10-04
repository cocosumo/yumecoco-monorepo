import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import jaLocale from 'date-fns/locale/ja';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ComponentProps } from 'react';



/**
 * Japanese format date picker.
 *
 * @param props
 * @returns
 */
export const JADatePicker = ( datePickerProps: ComponentProps<typeof DatePicker>) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
      <DatePicker
        {...datePickerProps}
      />

    </LocalizationProvider>
  );
};