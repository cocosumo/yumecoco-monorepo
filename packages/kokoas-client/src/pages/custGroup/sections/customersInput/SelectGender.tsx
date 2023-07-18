import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

const genderChoices = ['女性', '男性'] as const;

export const SelectGender = ({
  index,
}:{ 
  index: number,
}) => {
  const { control } = useTypedFormContext();
  return (
    <Controller 
      control={control}
      name={`customers.${index}.gender`}
      render={({
        field: {
          onChange,
          ...restFields
        },
      })=> {

        return (
          <FormControl
            size='small' 
            sx={{
              maxWidth: 120,
            }}
            fullWidth
          >
            <InputLabel>
              性別
            </InputLabel>
            <Select
              onChange={(e) => onChange(e.target.value)}
              label={'性別'}
              {...restFields}
            >
              <MenuItem value="">
                <em>
                  --- 指定ないし ---
                </em>
              </MenuItem>
              {genderChoices.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
              
            </Select>
            <FormHelperText>
              {' '}
            </FormHelperText>
          </FormControl>);
      }}
    />

  );
};