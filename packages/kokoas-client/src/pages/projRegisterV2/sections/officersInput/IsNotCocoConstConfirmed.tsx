import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';

export const IsNotCocoConstConfirmed = () => {
  const { control, trigger } = useTypedFormContext(); 
  return (
    <Controller 
      name={'isNotCocoConstConfirmed'}
      control={control}
      render={({
        field: {
          value,
          onChange,
          ...otherFieldProps
        },
      }) => {

        return (
          <Tooltip title={(<div>
            {'工事担当者が未定の場合は、チェックを入れてください'}
            <br />
            {'工事担当者１に限ります。工事担当者２の場合は不要です。'}
          </div>)}
          >
            <FormControlLabel 
              onChange={(_, checked) => {
                onChange(checked);
                trigger('cocoConst.0');
              }}
              control={<Checkbox checked={value} />} 
              label="未定"
              {...otherFieldProps}
            />
          </Tooltip>

        );
      }}
    />
  );
  
};