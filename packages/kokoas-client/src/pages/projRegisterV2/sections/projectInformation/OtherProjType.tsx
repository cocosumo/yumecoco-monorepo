import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { TextField } from '@mui/material';

export const OtherProjType = ({
  disabled,
}:{
  disabled?: boolean
}) => {
  const {
    control,
    setValue,
    getValues,
  } = useTypedFormContext();

  const projTypeName = useTypedWatch({
    name: 'projTypeName',
    control,
  }) as string;

  if (!projTypeName.includes('その他')) {
    return null;
  }

  return (
    <Controller 
      name='otherProjType'
      control={control}
      render={({
        field: {
          ref,
          onChange,
          ...otherField
        },
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = (isSubmitted || isTouched) && !!error;

        return (
          <TextField 
            label='その他工事種別'
            inputRef={ref}
            required
            onChange={(e) => {
              const newValue = e.target.value;
              onChange(newValue);

              const custName = getValues('custName');              

              setValue('projName', `${custName}様邸　${newValue || projTypeName}`);
            }}
            {...otherField}
            disabled={disabled}
            size='small'
            error={showError} 
            helperText={error?.message}
            fullWidth
          />
        );
      }}
    />
  );
};