import Grid from '@mui/material/Unstable_Grid2/';
import { CopyProjLocation } from '../parts/CopyProjLocation';
import { Postal } from '../fields/Postal';
import { TextField } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { BuildingType } from '../fields/BuildingType';

export const ProjectLocation = () => {

  const {
    control,
  } = useFormContext<TypeOfForm>();

  return (
    <Grid 
      container
      xs={12}
      spacing={2}
    >

      <CopyProjLocation />


      <Postal />

      <Grid xs={12} lg={8}>
        <TextField fullWidth label={'住所'} />
      </Grid>
      <Grid xs={12} lg={8}>
        <TextField fullWidth label={'住所（番地以降）'} />
      </Grid>
      <Grid xs={12} lg={4}>
        <ControlledCheckBox label='仮換地地番を入力する' name="isAddressKari" control={control} />
      </Grid>
      <Grid xs={12} lg={8}>
        <TextField fullWidth label={'仮換地住所'} />
      </Grid>
      <Grid xs={12} lg={8}>
        <BuildingType />
      </Grid>
    </Grid>

  );
};