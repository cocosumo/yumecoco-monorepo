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
        unmask={false}
        inputRef={ref}
        // DO NOT USE onChange TO HANDLE CHANGES!
        // USE onAccept INSTEAD
        onAccept={(value: any) => {
          console.log('onAccept', value);
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
        formState: {
          isSubmitted
        }
      }) => {
        const showError = !!error && (isTouched || isSubmitted);

        return (
          <TextField
            size='small'
            label={label}
            id="postal"
            value={value}
            onInput={(e) => {
              const newValue = (e.target as HTMLInputElement).value;
              onChange(newValue)
            }}
            // onChange, is flaky when used with IMaskInput
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