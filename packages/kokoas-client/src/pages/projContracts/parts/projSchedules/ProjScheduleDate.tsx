import { TextField } from '@mui/material';
import { useField } from 'formik';
import { ComponentProps } from 'react';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { KeyOfForm } from '../../form';

interface ProjScheduleDateProps extends Partial<ComponentProps<typeof JADatePicker>> {
  fieldName: KeyOfForm,
  variant?: ComponentProps<typeof TextField>['variant'],
  label?: string
  isEmphasized?: boolean,
  helperText?: string,
  disabled?: boolean
}

export const ProjScheduleDate = (props: ProjScheduleDateProps) => {
  const {
    fieldName,
    variant = 'standard',
    label,
    isEmphasized = false,
    helperText = ' ',
    disablePast = true,
    disabled = false,
    ...jaDateProps
  } = props;
  const [field, meta, helpers] = useField(fieldName);
  const { value, name } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      {...jaDateProps}
      /* Need to use null as empty string wont work when clearing the field.
      This is different with other fields where they
      become uncontrolled component when value becomes null. ~ ras 2022.10.03 */
      value={value || ''}
      disablePast={disablePast}
      disabled={disabled}
      views={['year', 'month', 'day']}
      onAccept={(v) => {
        setValue(v ?? '', true);
      }}
      onChange={(v) => {
        setValue(v ?? '', true);
        setTouched(true);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={isEmphasized ? {
            '& .MuiOutlinedInput-root': {
              background: '#9CDAF9',
            },
          } : undefined}
          name={name}
          label={label}
          onBlur={() => {
            setTouched(true, true);
          }}
          variant={variant}
          error={isShowError}
          helperText={`${isShowError ? error : helperText}`}
          disabled={disabled}
        />)}
    />
  );
};