import { Checkbox, FormControlLabel } from '@mui/material';
import { Control, Controller, FieldValues, Path, UnPackAsyncDefaultValues } from 'react-hook-form';


export function ControlledCheckBox<T extends FieldValues >({
  name,
  label,
  control,
}:{
  name: Path<UnPackAsyncDefaultValues<T>>,
  control: Control<T>
  label: string,
}) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { value, onChange, ...rest } = field;
        return (
          <FormControlLabel
            control={(
              <Checkbox
                {...rest}
                onChange={(_, checked) => {
                  onChange(checked);
                }}
                /**
                 * HTMLのinput要素のデフォルト動作は、入力要素の種類にかかわらず、常に文字列値を返します。
                 * ただし、チェックボックスなどの一部の入力タイプは、デフォルトでブール値を返します。
                 * テキスト入力がブール値を必要とする場合は、文字列値をブール値に変換する必要があります。
                 * https://github.com/react-hook-form/react-hook-form/discussions/1717
                 */
                checked={typeof value === 'boolean' ? value : value === 'true'}
              />)}
            label={label}
          />
        );

      }}
    />
  );
}