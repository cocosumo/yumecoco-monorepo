import { ProjectType } from './ProjectType';
import { Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { useTypedWatch } from '../../hooks';
import { BuildingType } from '../../fields/BuildingType';


export const ProjectInformation = () => {
  const hasContract = useTypedWatch({
    name: 'hasContract',
  }) as boolean;

  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '600px',
      }}
    >
      <BuildingType disabled={hasContract} />


      <ProjectType disabled={hasContract} />

      <ControlledTextField
        label='工事名称'
        placeholder='山田太郎様　新築工事'
        name='projName'
        disabled={hasContract}
        required
      />


    </Stack>
  );
};