import { CocoConstSelect } from 'kokoas-client/src/components/ui/selects/cocoConstSelect/CocoConstSelect';
import { ProjectType } from './ProjectType';
import { Stack, TextField } from '@mui/material';


export const ProjectInformation = () => {
  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '600px',
      }}
    >

      <ProjectType />

      <TextField 
        size='small'
        label={'工事名称'}
      />

      <Stack direction={'row'} spacing={2}>
        <CocoConstSelect />
        <CocoConstSelect />
      </Stack>

    </Stack>
  );
};