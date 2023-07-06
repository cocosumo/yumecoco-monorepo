import { Button, Stack } from '@mui/material';
import { MaskedPostal } from './postalField/MaskedPostal';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { useTypedFormContext } from '../../hooks';

export const FinalAddressFields = () => {
  
  const { getValues, setValue } = useTypedFormContext();

  return (
    <>
      <Stack 
        direction={'row'} 
        spacing={2}
      >
        <MaskedPostal 
          name='finalPostal'
          label="確定後郵便番号"
        /> 
        <Button
          size='small'
          variant='outlined'
          onClick={() => {
            const [
              postal,
              address1,
              address2,
            ] = getValues([
              'postal',
              'address1',
              'address2',
            ]);
            
            setValue('finalPostal', postal, { shouldValidate: true });
            setValue('finalAddress1', address1, { shouldValidate: true });
            setValue('finalAddress2', address2, { shouldValidate: true });
          }}
        >
          仮換地住所をコピー
        </Button>

      </Stack>
       
      <ControlledTextField
        name={'finalAddress1'}
        label='確定住所（県市区町村））'
        placeholder='愛知県名古屋市中区'
        width={600}
      />
      <ControlledTextField
        name={'finalAddress2'}
        label='確定住所（番地以降）'
        placeholder='２番地１９'
        width={600}
      />
    </>
      
  );
};