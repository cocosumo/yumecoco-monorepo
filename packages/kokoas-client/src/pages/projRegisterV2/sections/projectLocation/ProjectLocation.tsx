import { CopyProjLocation } from '../../parts/CopyProjLocation';
import { Postal } from './postalField/Postal';
import { Stack } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { BuildingType } from '../../fields/BuildingType';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { TempAddressField } from './TempAddressField';

export const ProjectLocation = () => {

  const {
    control,
  } = useTypedFormContext();

  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '600px',
      }}
    >

      <CopyProjLocation />


      <Postal />


      <ControlledTextField
        name='address1'
        label='住所（県市区町村）'
        placeholder='愛知県名古屋市中区'
      />
  
      <ControlledTextField
        name={'address2'}
        label='住所（番地以降）'
        placeholder='２番地１９'
      />

      <ControlledCheckBox 
        label='仮換地地番を入力する' 
        name="isAddressKari"
        control={control}
      />

      <TempAddressField /> 

      <BuildingType />
    </Stack>

  );
};