import { FormControl, InputLabel } from '@mui/material';
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
            <ContractTypeFieldChoices 
              label="カテゴリ"
              onChange={onChange}
              value={value}
            />
          </FormControl>
        );
      }}
    />
    
  );
};