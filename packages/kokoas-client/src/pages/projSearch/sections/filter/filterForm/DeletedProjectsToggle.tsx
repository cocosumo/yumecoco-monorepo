import { Controller, useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../../schema';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useStartSearch } from '../../../hooks/useStartSearch';

export const DeletedProjectsToggle = ({
  submitOnchange = false,
}:{
  submitOnchange?: boolean;
}) => {
  const handleStartSearch = useStartSearch();
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
        <Tooltip title="削除された顧客と工事のみ" placement='top-start'> 
          <FormControlLabel
            control={(
              <Checkbox 
                checked={value} 
                onChange={(_, newVal) => {
                  onChange(newVal);
                  if (submitOnchange) {
                    handleStartSearch();
                  }
                }}
              />)}
            label="削除案件"
          />
        </Tooltip>
      )}
    />
  );
};
