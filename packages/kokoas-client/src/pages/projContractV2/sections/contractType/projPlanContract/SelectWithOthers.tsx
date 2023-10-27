import { Controller } from 'react-hook-form';
import { KeyOfForm } from '../../../form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { selectFieldConfig } from '../../../selectFieldConfig';


export const SelectWithOthers = ({
  name,
}:{
  name: KeyOfForm;
}) => {
  const { control } = useTypedFormContext();

  const {
    label = name,
    options = [],
    required,
  } = selectFieldConfig?.[name] || {};

  return (
    <Controller 
      name={name as 'purpose'}
      control={control}
      render={({ 
        field:{
          value,
          onChange,
          ...otherFields
        }, 
      }) => {


        let parsedSelectValue = value;

        const isInOptions = value === '' ||  options.includes(value || '');

        if (!isInOptions) {
          parsedSelectValue = 'その他';
        }

        return (
          <Stack
            direction={'row'}
            spacing={2}
          >
            <FormControl 
              size='small'
              sx={{
                width: 300,
              }}
              required={required}
            >
              <InputLabel id={`label-${name}`}>
                {label}
              </InputLabel>
              <Select
                labelId={`label-${name}`}
                id={name}
                label={label}
                value={parsedSelectValue || ''}
                onChange={(e) => onChange(e.target.value as string)}
                {...otherFields}
              >
                {!required && (
                  <MenuItem value={''}>
                    --未設定--
                  </MenuItem>
                
                )}
                {options.map((option) => (
                  <MenuItem 
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
                <MenuItem value={'その他'}>
                  その他
                </MenuItem>
              </Select>
            </FormControl>
            {!isInOptions && (
              <TextField 
                required 
                label={`${label}（その他）`}
                value={value === 'その他' ? '' : value}
                size='small'
                sx={{
                  width: 300,
                }}
                onChange={(e) => onChange(e.target.value)}
                {...otherFields}
              />
            )}

          </Stack>
        );
      }}
    />);
};