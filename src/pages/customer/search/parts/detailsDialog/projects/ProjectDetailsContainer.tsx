import { Card, Divider, Stack } from '@mui/material';
import { EstimatesList } from './EstimatesList';
import { ProjectDetails } from './ProjectDetails';

export const ProjectDetailsContainer = (props: {
  fetchedProjects : ProjectDetails.SavedData[],
}) => {

  const { fetchedProjects } = props;


  return (
    <>
      {
        fetchedProjects?.map((projectDetailsData) => {
          const { $id } = projectDetailsData;
          return (
            <Stack key={$id.value}
              spacing={2}
              mb={2}
            >
              <Card variant='outlined'>
                <Stack direction={'row'} spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <ProjectDetails projectDetailsData={projectDetailsData} />

                  <EstimatesList projId={$id.value} />
                </Stack>
              </Card>
            </Stack>
          );
        })
      }
    </>
  );
};