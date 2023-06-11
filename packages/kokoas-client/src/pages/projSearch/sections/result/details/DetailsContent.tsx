import {  DialogContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomerDetails } from './customerDetails/CustomerDetails';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { ProjectDetails } from './projectDetails/ProjectDetails';

export const DetailsContent = ({
  projId,
  tabIdx,
}:{
  projId: string
  tabIdx: number,
}) => {


  const { data: recProj } = useProjById(projId);

  const {
    custGroupId,
  } = recProj ?? {};

  return (
    <DialogContent 
      dividers
      sx={{
        bgcolor: grey[50],
      }}
    >
      {tabIdx === 0 && custGroupId?.value && (
        <CustomerDetails 
          custGroupId={custGroupId.value}
        />
      )}

      {tabIdx === 1 && recProj && (
        <ProjectDetails recProj={recProj} />
      )}

    </DialogContent>
  );
};