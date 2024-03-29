import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form';


/**
 * react-hook-form と連携したチェックボックス
 * MUIのCheckboxPropsを継承しているので、MUIのCheckboxPropsのプロパティをそのまま使える
 */
export function ControlledCheckBox<T extends FieldValues >({
  name,
  label,
  control,
  indeterminate,
  onChange,
  ...others
}: CheckboxProps & {
  control: Control<T>
  name: FieldPath<T>,
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
                indeterminate={indeterminate}
              />)}
            label={label}
          />
        );

      }}
    />
  );
}