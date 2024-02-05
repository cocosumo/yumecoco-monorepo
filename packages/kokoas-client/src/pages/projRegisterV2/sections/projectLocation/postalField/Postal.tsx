import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { NormalPostal } from 'kokoas-client/src/components/reactHookForm/NormalPostal';
import { useTypedFormContext } from '../../../hooks';

export const Postal = ({
  disabled = false,
  showButtons = true,
}:{
  disabled?: boolean,
  showButtons?: boolean,
}) => {
  const { control } = useTypedFormContext();


  return (
    <Stack 
      direction={'row'} 
      spacing={2}
    >
      <NormalPostal
        name='postal' 
        control={control}
        disabled={disabled}
      /> 

      {!disabled && showButtons && (
        <>
          <AddressByPostal />
          <PostalByAddress />
          <SelectAddress />
        </>
      )}


    
    </Stack>

  );
};