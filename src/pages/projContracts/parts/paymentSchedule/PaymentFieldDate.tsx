import { TextField } from '@mui/material';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';

export const PaymentFieldDate = ({
  disabled,
  name,
} : {
  disabled: boolean,
  name: string
}) => {
  return (
    <JADatePicker
      disabled={disabled}
      value={new Date()}
      onChange={()=>{}}
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          variant={'standard'}
        />)}
    />
  );
};