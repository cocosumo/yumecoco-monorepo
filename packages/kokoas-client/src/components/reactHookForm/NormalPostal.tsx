import { TextField } from '@mui/material';
import { convertToHalfWidth } from 'libs';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

const parsePostal = (value: string) => {
  const newValue = value.replace('-', '');
  if (!value) return '';


  return [newValue.slice(0, 3), newValue.slice(3)]
    .filter(Boolean)
    .join('-');

  
};

export function NormalPostal<T extends FieldValues>({
  control,
  name,
  disabled,
  label = '郵便番号',
}:{
  control: Control<T>,
  name: string,
  disabled?: boolean,
  label?: string,
}) {
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  
  return  (
    <Controller 
      name={name as Path<T>}
      control={control}
      render={({
        field: {
          onChange,
          value,
        }, 
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = !!error && (isTouched || isSubmitted);

        return (
          <TextField 
            value={hasFocus ? value : parsePostal(value)}
            size='small'
            label={label}
            onChange={(e) => {
              onChange(e);
            }}
            onFocus={() => {
              setHasFocus(true);
            }}
            onBlur={(e) => {
              setHasFocus(false);
              const newValue = e.target.value.replace('-', '');
              const numberVal = +convertToHalfWidth(newValue);

              // 入力値が数字でない場合、もしくは0未満の場合は空文字にする
              if (isNaN(numberVal) || numberVal < 0) {
                onChange('' as  PathValue<T, Path<T>>);
                return;
              }

              const parsedNewValue = numberVal.toString() as PathValue<T, Path<T>>;

              onChange(newValue ? parsedNewValue : '' as  PathValue<T, Path<T>>);
  
            }}
            error={showError}
            disabled={disabled}
            sx={{
              width: 150,
            }}
            helperText={showError ? error?.message : ''}
          />
        );
      }}
    
    />

  );
}