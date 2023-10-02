import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { recordCancelStatuses } from 'types';

export const CancelStatus = () => {
  const { control } = useTypedFormContext();


  return (
    <Controller 
      control={control}
      name="cancelStatus"
      render={(
        { field: {
          value,
          onChange,
        } },
      ) => {
        return (
          <ToggleButtonGroup
            value={value}
            onChange={(_, newValues) => onChange(newValues)}
            color='error'
            size='small'
          >
            {recordCancelStatuses.map((s) => (
              <ToggleButton 
                key={s} 
                value={s}
                
              >
                {s}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      }}
    />
    
  );
};