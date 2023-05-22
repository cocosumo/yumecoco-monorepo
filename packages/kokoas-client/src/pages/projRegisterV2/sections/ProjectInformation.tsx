import Grid from '@mui/material/Unstable_Grid2/';
import { ProjectType } from '../fields/ProjectType';
import { TextField } from '@mui/material';


export const ProjectInformation = () => {
  return (
    <Grid 
      container
      xs={12}
      spacing={1}
    >
      <Grid 
        xs={12}
        md={6} 
        lg={4}
      >
        <ProjectType />
      </Grid>

      <Grid xs={12} lg={8} >
        <TextField label={'工事名称'} fullWidth />
      </Grid>
      
    </Grid>
  );
};