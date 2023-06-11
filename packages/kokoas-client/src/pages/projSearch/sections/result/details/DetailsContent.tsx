import { DialogContent } from '@mui/material';
import { ProjectDetails } from './projectDetails/ProjectDetails';
import { grey } from '@mui/material/colors';

export const DetailsContent = ({
  projId,
}:{
  projId: string
}) => {
  return (
    <DialogContent 
      dividers
      sx={{
        bgcolor: grey[50],
      }}
    >
      <ProjectDetails projId={projId} />
    </DialogContent>
  );
};