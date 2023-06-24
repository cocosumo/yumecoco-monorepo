import { CopyProjLocation } from '../../parts/CopyProjLocation';
import { Postal } from './postal/Postal';
import { Stack, TextField } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { BuildingType } from '../../fields/BuildingType';
import { useTypedFormContext } from '../../hooks/useTypedRHF';

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


      <TextField
        size='small'
        label={'住所'}
        placeholder='愛知県豊川市赤坂台'
      />
  
      <TextField
        label={'住所（番地以降）'}
        size='small'
        placeholder='一丁目1番1号'
      />
      <ControlledCheckBox label='仮換地地番を入力する' name="isAddressKari" control={control} />
      <TextField 
        size='small' 
        label={'仮換地住所'}
      />
      <BuildingType />
    </Stack>

  );
};