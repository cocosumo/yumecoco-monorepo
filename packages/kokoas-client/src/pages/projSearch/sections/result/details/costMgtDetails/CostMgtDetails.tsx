import { LinearProgress, Stack } from '@mui/material';
import { useAndpadCostMgtDataByProjId } from 'kokoas-client/src/hooksQuery';

export const CostMgtDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { 
    data,
    isLoading, 
  } = useAndpadCostMgtDataByProjId(projId);

  if (isLoading) return <LinearProgress />;

  console.log(data);


  return (
    <Stack
      spacing={2}
    >
      projId: 
      {' '}
      {projId}
    </Stack>
  );
};