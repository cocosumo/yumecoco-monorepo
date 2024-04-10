import { TextField } from '@mui/material';



export const CustomEmailField = ({
  label,
}:{
  label: string
}) => {

  return (
    <TextField
      label={label}
      fullWidth
      variant={'outlined'}
      size={'small'}
      InputProps={{
        style: { maxWidth: '400px' },
      }}
    />
  );
};