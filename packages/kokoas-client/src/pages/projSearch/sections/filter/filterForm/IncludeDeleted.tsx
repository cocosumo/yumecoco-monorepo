import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';

export const IncludeDeleted = () => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Controller 
      control={control}
      name="includeDeleted"
      render={({
        field: {
          value,
          onChange,
        },
      }) => (
        <Tooltip title="削除された顧客と工事を含む" placement='top-start'> 
          <FormControlLabel
            control={(<Checkbox checked={value} onChange={(_, newVal) => onChange(newVal)} />)}
            label="削除"
          />
        </Tooltip>
      )}
    />
  );
};
