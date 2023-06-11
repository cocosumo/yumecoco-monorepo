import { DialogContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CustomerDetails } from './customerDetails/CustomerDetails';
import { useProjById } from 'kokoas-client/src/hooksQuery';

export const DetailsContent = ({
  projId,
}:{
  projId: string
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
      {custGroupId && (
      <CustomerDetails 
        custGroupId={custGroupId.value}
      />
      )}

    </DialogContent>
  );
};