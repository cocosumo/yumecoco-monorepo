import {  Checkbox, FormControl, FormControlLabel, InputAdornment, Stack, TextField } from '@mui/material';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { usePaymentField } from './usePaymentFields';


export const PaymentField = (
  {
    name,
    label,
  } : {
    name: 'keiyakukin' | 'chakushukin' | 'chuukankin' | 'saishuukin',
    label: string
  },

) => {

  const { chkProps } = usePaymentField(name);
  const [
    {
      value: chkValue,
    },
    ,
    {
      setValue: chkSetValue,
    },
  ] = chkProps;


  return (

    <FormControl>
      <Stack direction={'row'} spacing={1}>
        <FormControlLabel
          label={label}
          control={(
            <Checkbox
              onChange={(event) => {chkSetValue(event.target.checked);}}
              checked={chkValue}
              sx={{
                transform: 'scale(1.5)',
              }}
            />)}

        />
        <TextField
          disabled={!chkValue}
          variant={'standard'}
          inputProps={{
            style: { textAlign: 'right' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                円
              </InputAdornment>),
          }}
        />
        <JADatePicker
          disabled={!chkValue}
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
      </Stack>
    </FormControl>


  );
};