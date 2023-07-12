import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { ContractTypeFieldChoices } from './ContractTypeFieldChoices';




export const ContractTypeField = () => {

  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'contractType'}
      control={control}
      render={({
        field,
        fieldState: {
          isTouched,
          error,
        },
      }) => {
        const showError = !!error && isTouched;

        return (
          <FormControl 
            fullWidth
            size='small'
            sx={{
              maxWidth: 300,
            }}
            error={showError}
          >
            <InputLabel>
              カテゴリ
            </InputLabel>
            <ContractTypeFieldChoices 
              label="カテゴリ"
              {...field}
            />
            <FormHelperText>
              {showError && error.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
    
  );
};