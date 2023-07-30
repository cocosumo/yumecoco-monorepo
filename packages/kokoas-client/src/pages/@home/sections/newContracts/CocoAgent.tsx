import { CircularProgress, Typography } from '@mui/material';
import { getAgentNamesByType as custAgentNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { getAgentNamesByType as projGetAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import { useCustGroupById, useProjById } from 'kokoas-client/src/hooksQuery';

export const CocoAgent = ({
  projId,
}:{
  projId: string
}) => {
  const { 
    data, 
    isLoading: projIsLoading, 
  } = useProjById(projId);
  const {
    agents,
    custGroupId,
  } = data || {};

  const projCocoAgents = agents ? projGetAgentNamesByType(agents, 'cocoAG') : '';


  const { 
    data: custGroupRec, 
    isLoading: cusIsLoading,
  } = useCustGroupById(
    custGroupId?.value || '',
    !projIsLoading && !projCocoAgents,
  );

  const {
    agents: custGroupAgents,
  } = custGroupRec || {};

  const custGroupCocoAgents = custGroupAgents ? custAgentNamesByType(custGroupAgents, 'cocoAG') : '';
  
  const resolvedAgents = projCocoAgents || custGroupCocoAgents;

  if (!resolvedAgents && (projIsLoading || cusIsLoading)) {
    return <CircularProgress size={14} />;
  }


  return (
    <Typography 
      variant={'caption'}
    >
      {resolvedAgents}
    </Typography>
  );
};