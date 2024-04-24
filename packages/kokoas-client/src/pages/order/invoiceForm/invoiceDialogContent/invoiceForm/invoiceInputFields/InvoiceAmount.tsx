import { 
  FormControl, 
  FormHelperText, 
  FormLabel, 
  InputAdornment, 
  Stack,
  TextField,
} from '@mui/material';
import { useInvoiceFormContext } from '../../../hooks/useInvoiceRHF';
import { useController } from 'react-hook-form';
import { useNumberCommaField } from 'kokoas-client/src/hooks';


export const InvoiceAmount = () => {

  const { control } = useInvoiceFormContext();
  
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: 'invoiceAmount',
  
  });

  const textProps = useNumberCommaField({
    ...field,
    shouldSelectOnFocus: false,
  });



  return (

    <FormControl 
      fullWidth
      error={!!error}
    > 
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
      >

        <FormLabel
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          請求金額
        </FormLabel>

        <TextField
          inputRef={field.ref} 
          size='small'
          variant='outlined'
          sx={{
            flexGrow: 1,
          }}
          inputProps={{
            style: { 
              textAlign: 'right', 
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                円
              </InputAdornment>),
          }}
          {...textProps}
        />
      </Stack>
          
      <FormHelperText>
        {error?.message}
      </FormHelperText>
  
    </FormControl>
    
  );
};  