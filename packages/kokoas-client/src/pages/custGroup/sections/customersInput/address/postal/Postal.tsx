import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { MaskedPostal } from './MaskedPostal';

export const Postal = ({
  index,
}:{
  index: number,
}) => {
  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      justifyContent={'space-between'}
    >
      <MaskedPostal 
        index={index}
      /> 

      <AddressByPostal index={index} />
      <PostalByAddress index={index} />
      <SelectAddress index={index} />
            
    </Stack>

  );
};