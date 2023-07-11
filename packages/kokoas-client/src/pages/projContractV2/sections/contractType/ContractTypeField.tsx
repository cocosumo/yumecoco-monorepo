import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
        },
      }) => {
        return (
          <FormControl 
            fullWidth
            size='small'
            sx={{
              maxWidth: 300,
            }}
          >
            <InputLabel>
              カテゴリ
            </InputLabel>
            <Select
              label="カテゴリ"
              onChange={onChange}
              value={value}
            >
              {contractTypes.map(choice => (
                <MenuItem
                  key={choice}
                  value={choice}
                >
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
    
  );
};