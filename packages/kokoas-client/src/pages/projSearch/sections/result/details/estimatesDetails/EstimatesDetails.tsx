import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';

export const EstimatesDetails = ({
  projId,
}:{
  projId: string
}) => {
  console.log('EstimatesDetails', projId);
  return (
    <Stack direction={'row'}>
      <BranchList /> 
      <EstimateContent />
    </Stack>
  );
};