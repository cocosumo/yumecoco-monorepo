import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';

export const EstimatesDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { data } = useEstimatesByProjId(projId);

  return (
    <Stack direction={'row'}>
      <BranchList data={data} /> 
      <EstimateContent />
    </Stack>
  );
};