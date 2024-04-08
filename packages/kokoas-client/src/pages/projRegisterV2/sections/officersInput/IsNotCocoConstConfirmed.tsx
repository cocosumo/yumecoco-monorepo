import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';

export const IsNotCocoConstConfirmed = () => {
  const { control } = useTypedFormContext(); 
  
  return (
    <Controller 
      name={'isNotCocoConstConfirmed'}
      control={control}
      render={({
        field: {
          value,
          onChange,
          name },
      }) => {
  
          
        return (
          <Tooltip title={(<div>
            {'工事担当者が未定の場合は、チェックを入れてください'}
            <br />
            {'工事担当者１に限ります。工事担当者２の場合は不要です。'}
          </div>)}
          >
            <FormControlLabel 
              name={name}
              control={(
                <Checkbox
                  onChange={(_, checked) => {
                    onChange(checked);
                  }}
                  value={value}
                />)} 
              label="未定"
            />
          </Tooltip>

        );
      }}
    />
  );
  
};