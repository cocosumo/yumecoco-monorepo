import { Controller } from 'react-hook-form';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { TForm } from '../../schema';
import { useEffect } from 'react';

export const IsNotCocoConstConfirmed = () => {
  const { control, trigger } = useTypedFormContext(); 

  const isNotCocoConstConfirmed = useTypedWatch({
    name: 'isNotCocoConstConfirmed',
  }) as TForm['isNotCocoConstConfirmed'];

  useEffect(() => {
    trigger('cocoConst.0');
  }, [isNotCocoConstConfirmed, trigger]);
  
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
                  checked={value}
                />)} 
              label="未定"
            />
          </Tooltip>

        );
      }}
    />
  );
  
};