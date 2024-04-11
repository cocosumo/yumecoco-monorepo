import { TextField } from '@mui/material';



export const CustomEmailField = ({
  label,
  required,
}:{
  label: string,
  required?: boolean,
}) => {

  return (
    <TextField
      label={label}
      fullWidth
      variant={'outlined'}
      size={'small'}
      required={required}
      InputProps={{
        style: { maxWidth: '400px' },
      }}
    />
  );
};