import { Autocomplete, TextField } from '@mui/material';
import { TControlledComponent } from '../schema';

export const c: TControlledComponent = ({
  control,
}) => {
  return (
    <Autocomplete
      options={[]}
      freeSolo
      getOptionLabel={(option) => option}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={'仕入先'}
            size={'small'}
            fullWidth
            variant={'standard'}
            inputRef={control.register}
            name={'supplier'}
            required
          />
        );
      }}
    />
  );
};