import { ProjectType } from './ProjectType';
import { Stack } from '@mui/material';
import { ControlledTextField } from '../../fields/ControlledTextField';
import { CocoConstSelect } from './CocoConstSelect';


export const ProjectInformation = () => {


  return (
    <Stack 
      spacing={2}
      sx={{
        maxWidth: '600px',
      }}
    >

      <ProjectType />

      <ControlledTextField
        label='工事名称'
        placeholder='山田太郎様　新築工事'
        name='projName'
      />
      <Stack direction={'row'} spacing={2}>
        <CocoConstSelect 
          label={'工事担当者１'}
          name='cocoConst1'
        />
        <CocoConstSelect 
          label={'工事担当者２'}
          name='cocoConst2'
        />
      </Stack>

    </Stack>
  );
};