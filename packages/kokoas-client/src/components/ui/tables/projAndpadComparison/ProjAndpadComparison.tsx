import { Stack } from '@mui/material';
import { SaveProjectData } from 'api-andpad';
import { useProjById } from 'kokoas-client/src/hooksQuery';

/**
 * Compare cocoas project with andpad project
 * 
 */
export const AndpadProjComparison = ({
  projId,
  andpadRecord,
}:{
  projId: string,
  andpadRecord: SaveProjectData,
}) => {

  const { data: cocoasRecord } = useProjById(projId);
  
  return (
    <Stack direction={'row'} spacing={2} pt={2}>
      {JSON.stringify({ ...cocoasRecord, ...andpadRecord })}
    </Stack>
  );
};