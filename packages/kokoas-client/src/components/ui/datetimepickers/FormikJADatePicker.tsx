import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextFieldProps } from '@mui/material';
import { useField } from 'formik';
import { ComponentProps } from 'react';
import { JADatePicker } from './JADatePicker';

export const FormikJADatePicker = (
  props: TextFieldProps & {
    name: string
    disabled?: boolean,
    dataPickerProps?: Partial<ComponentProps<typeof DatePicker>>
  },
) => {
  const {
    disabled,
    name,
    dataPickerProps,
    ...textFieldProps } = props;
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      {...dataPickerProps}
      disabled={!!disabled}
      /* Need to use null as empty. String won't work when clearing the field.
      This is different with other fields where they
      become uncontrolled component when value becomes null. ~ ras 2022.10.03 */
      value={value || null}
      views={['year', 'month', 'day' ]}
      onChange={(v)=>{
        setTouched(true);
        setValue(v ?? '', true);
      }}
      slotProps={{
        textField: {
          ...textFieldProps,
          name,
          onBlur: () => setTouched(true, true),
          error: isShowError,
          helperText: isShowError ? error : '',
        },
      }}
    />
  );
};