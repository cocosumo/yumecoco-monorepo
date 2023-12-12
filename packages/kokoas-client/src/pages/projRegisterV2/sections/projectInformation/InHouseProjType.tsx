import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { TextField } from '@mui/material';

export const InHouseProjType = () => {
  const {
    control,
    setValue,
    getValues,
  } = useTypedFormContext();

  const projTypeName = useTypedWatch({
    name: 'projTypeName',
    control,
  }) as string;

  if (!projTypeName.includes('自社物件')) {
    return null;
  }

  return (
    <Controller 
      name='inHouseProjType'
      control={control}
      render={({
        field: {
          ref,
          onChange,
          ...otherField
        },
        fieldState: {
          error,
        },
        formState: {
          isSubmitted,
        },
      }) => {
        const showError = isSubmitted && !!error?.message;

        return (
          <TextField 
            label='自社工事区分'
            inputRef={ref}
            required
            onChange={(e) => {
              const newValue = e.target.value;
              onChange(newValue);

              const hasContract = getValues('hasContract');
              const custName = getValues('custName');      

              if (!hasContract) {
                setValue('projName', `${custName}様邸　${newValue || projTypeName}`);
              }
            }}
            {...otherField}
            //disabled={disabled}
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