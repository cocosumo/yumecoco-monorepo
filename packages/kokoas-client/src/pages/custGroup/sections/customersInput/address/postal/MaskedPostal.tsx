import { TextField } from '@mui/material';
import { useTypedFormContext } from 'kokoas-client/src/pages/custGroup/hooks/useTypedHooks';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PostalMask = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  },
);

export const MaskedPostal = ({
  disabled,
  label = '郵便番号',
  required,
  index,
}:{
  disabled?: boolean;
  label?: string,
  required?: boolean,
  index: number,
}) => {
  const { control } = useTypedFormContext();


  return (
    <Controller
      control={control}
      name={`customers.${index}.postal`}
      render={({
        field: {
          onChange,
          onBlur,
          value,
          ref,
        },
        fieldState: {
          error,
          isTouched,
        },
      }) => {
        const showError = !!error && isTouched;
        return (
          <TextField
            size='small'
            label={label}
            name="postal"
            id="postal"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            disabled={disabled}
            required={required}
            placeholder='441-3111'
            InputProps={{
              sx: {
                width: 200,
              },
              inputComponent: PostalMask as any,
            }}
            error={showError}
            helperText={showError ? error?.message : null}
          />
        );
      }}
    />


  );
};