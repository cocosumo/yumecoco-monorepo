import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { fieldMapJa } from '../../api/fieldMapJa';
import {  ranks } from 'types';
import { RankHelp } from './RankHelp';

const name = 'rank';
const label = fieldMapJa[name];


export const Rank = () => {
  const { 
    control,
  } = useTypedFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {
          onChange,
          ...fieldProps
        },
        fieldState: {
          error,
          isTouched,
        },
        formState: {
          isDirty,
        },

      }) => {
        const showError = (isTouched || isDirty) && !!error;
        
        return (
          <FormControl 
            error={showError}
            size='small'
            sx={{
              minWidth: 120,
            }}
          >
            <InputLabel>
              {label}
            </InputLabel>
            <Select 
              {...fieldProps}
              onChange={(e) => onChange(e.target.value)}
              label={label}
              startAdornment={<RankHelp />}
            >
              <MenuItem value={''}>
                <em>
                  ---
                </em>
              </MenuItem>
              {
                ranks.map((v) => (
                  <MenuItem 
                    key={v}
                    value={v}
                  >
                    {v}
                  </MenuItem>
                ))
              }

            </Select>
            <FormHelperText>
              {error?.message}
            </FormHelperText>
          </FormControl>
        ); 
      }}
    />
  );
};