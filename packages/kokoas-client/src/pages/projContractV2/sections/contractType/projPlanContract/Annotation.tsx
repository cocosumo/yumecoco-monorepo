import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { TextField } from '@mui/material';

export const Annotation = () => {
  const { control } = useTypedFormContext();
  return (
    <Controller 
      name="annotation"
      control={control}
      render={({
        field,
      }) => {


        return (
          <TextField 
            {...field}
            label="報酬額 注釈"
            size="small"
            fullWidth
            multiline
            minRows={2}
            placeholder='例：建物面積により決定'
          />);

      }}
    />
  );
};