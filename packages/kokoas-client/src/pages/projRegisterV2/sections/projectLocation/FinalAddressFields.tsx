import { Button, Stack } from '@mui/material';
import { MaskedPostal } from './postalField/MaskedPostal';
import { ControlledTextField } from '../../fields/ControlledTextField';

export const FinalAddressFields = () => {


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