import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Control, Controller, FieldValues, Path, UnPackAsyncDefaultValues } from 'react-hook-form';



export function ControlledCheckBox<T extends FieldValues >({
  name,
  label,
  control,
  indeterminate,
  onChange,
  ...others
}: CheckboxProps & {
  control: Control<T>
  name: Path<UnPackAsyncDefaultValues<T>>,
  label: string,
}) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { value, ...rest } = field;
        return (
          <FormControlLabel
            control={(
              <Checkbox
                {...others}
                {...rest}
                checked={value}
                onChange={(e, checked) => {
                  field.onChange(e);
                  onChange?.(e, checked);
                }}
                indeterminate={value && indeterminate}
              />)}
            label={label}
          />
        );

      }}
    />
  );
}