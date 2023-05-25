import { Card, Divider, Stack } from '@mui/material';
import { IProjects } from 'types';
import { ProjectDetails } from './ProjectDetails';
import { ContractsList } from './ContractsList';

export const ProjectDetailsContainer = (props: {
  fetchedProjects : IProjects[],
}) => {

  const { fetchedProjects } = props;


  return (
    <>
      {
        fetchedProjects?.map((projectDetailsData) => {
          const { uuid } = projectDetailsData;
          return (
            <Stack key={uuid.value}
              spacing={2}
              mb={2}
            >
              <Card variant='outlined'>
                <Stack direction={'row'} spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <ProjectDetails projectDetailsData={projectDetailsData} />

                  <ContractsList projId={uuid.value} />
                </Stack>
              </Card>
            </Stack>
          );
        })
      }
    </>
  );
};