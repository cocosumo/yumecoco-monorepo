import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { ContractTypeFieldChoices } from './ContractTypeFieldChoices';
import { ChangeEvent } from 'react';




export const ContractTypeField = () => {

  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'contractType'}
      control={control}
      render={({
        field: {
          onChange,
          ...restField
        },
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
            <Select
              label="カテゴリ"
              onChange={(e) => {
                onChange(e as ChangeEvent<Element>);
              }}
              {...restField}

            >
              <ContractTypeFieldChoices />
            </Select>
            <FormHelperText>
              {showError && error.message}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
    
  );
};