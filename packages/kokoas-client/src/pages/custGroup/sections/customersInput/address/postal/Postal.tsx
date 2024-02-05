import { Stack } from '@mui/material';
import { AddressByPostal } from './AddressByPostal';
import { SelectAddress } from './SelectAddress';
import { PostalByAddress } from './PostalByAddress';
import { NormalPostal } from 'kokoas-client/src/components/reactHookForm/NormalPostal';
import { useTypedFormContext } from 'kokoas-client/src/pages/custGroup/hooks/useTypedHooks';

export const Postal = ({
  index,
}:{
  index: number,
}) => {

  const { control } = useTypedFormContext();

  return (
    <Stack 
      direction={'row'} 
      spacing={2}
      justifyContent={'space-between'}
      alignItems={'flex-start'}
    >
      
      <NormalPostal 
        control={control}
        name={`customers.${index}.postal`}
      />

      <AddressByPostal index={index} />
      <PostalByAddress index={index} />
      <SelectAddress index={index} />
            
    </Stack>

  );
};