import { Stack, Typography } from '@mui/material';
import { IProjects } from 'types';
import { ContractAmount } from './ContractAmount';



export const ProjectsToolTipContent = ({
  projects,
}: {
  projects: IProjects[]
}) => {

  return (
    <Stack width={300}>
      {projects.map((project) => {
        return (
          <Stack
            key={project.uuid.value}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography
              maxWidth={250}
              fontSize={'0.6rem'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
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