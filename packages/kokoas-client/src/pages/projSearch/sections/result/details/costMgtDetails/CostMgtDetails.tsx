import { LinearProgress, Stack } from '@mui/material';
import { useAndpadCostMgtDataByProjId, useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { Summary } from './Summary';
import { Purchases } from './purchases/Purchases';

export const CostMgtDetails = ({
  projId,
}:{
  projId: string
}) => {

  const { 
    data,
    isLoading, 
  } = useAndpadCostMgtDataByProjId(projId);

  const { data: projRec } = useProjById(projId);
  const { data: andpadRec } = useAndpadOrderByProjId(projId);

  const parsedSystemId = projRec?.forceLinkedAndpadSystemId.value || String(andpadRec?.システムID);

  if (isLoading) return <LinearProgress />;
  
  return (
    <Stack
      spacing={2}
      p={2}
      width={'100%'}
      height={'100%'}
      overflow='auto'
    >
      {data && (
        <>
          <Summary 
            costMgtData={data}
            systemId={parsedSystemId}
          />
          <Purchases 
            costMgtData={data}
          />
        
        </>

      )}
      

    </Stack>
  );
};