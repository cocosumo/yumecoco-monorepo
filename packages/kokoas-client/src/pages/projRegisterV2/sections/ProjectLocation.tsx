import { CopyProjLocation } from '../parts/CopyProjLocation';
import { Postal } from '../fields/Postal';
import { Stack, TextField } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { BuildingType } from '../fields/BuildingType';

export const ProjectLocation = () => {

  const {
    control,
  } = useFormContext<TypeOfForm>();

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
        placeholder='愛知県豊川市'
      />
  
      <TextField
        label={'住所（番地以降）'}
        size='small'
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