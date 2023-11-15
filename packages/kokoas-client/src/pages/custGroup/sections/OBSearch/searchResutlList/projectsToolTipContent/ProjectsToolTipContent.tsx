import { Divider, Stack, Typography } from '@mui/material';
import { IProjects } from 'types';
import { ContractAmount } from './ContractAmount';



export const ProjectsToolTipContent = ({
  projects,
}: {
  projects: IProjects[]
}) => {

  return (
    <Stack
      spacing={0.5}
      divider={<Divider flexItem sx={{ borderColor: 'white' }}  />}
    >
      {projects.map((project) => {
        return (
          <Stack
            key={project.uuid.value}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography
              maxWidth={'300px'}
              fontSize={'0.6rem'}
            >
              {project.projName.value}
            </Typography>
            <ContractAmount projId={project.uuid.value} />
          </Stack>
        );
      })}

        
    </Stack>
  );
};