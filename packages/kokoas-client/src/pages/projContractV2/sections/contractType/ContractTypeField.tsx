import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm, contractTypes } from '../../schema';




export const ContractTypeField = () => {

  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller
      name={'contractType'}
      control={control}
      render={({
        field: {
          onChange,
          value,
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
              value={value}
              onChange={(e) => {
                onChange(e.target.value as string);
              }}
              {...restField}

            >
              {contractTypes
                .map(choice => (
                  <MenuItem
                    key={choice}
                    value={choice}
                  >
                    {choice}
                  </MenuItem>
                ))}
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