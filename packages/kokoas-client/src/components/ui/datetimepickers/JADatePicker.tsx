import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jaLocale from 'date-fns/locale/ja';
import { forwardRef, Ref } from 'react';


/**
 * Japanese format date picker.
 *
 * @param props
 * @returns
 */
export const JADatePicker = forwardRef(( datePickerProps: DatePickerProps<any>, ref) => {

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={jaLocale}
      dateFormats={{ monthAndYear: 'yyyy年 MM月' }}
    >
      <DatePicker
        {...datePickerProps}
        ref={ref as Ref<HTMLDivElement>}
        
      />

    </LocalizationProvider>
  );
});

JADatePicker.displayName = 'JADatePicker';