import { LinearProgress, Stack } from '@mui/material';
import { useAndpadCostMgtDataByProjId } from 'kokoas-client/src/hooksQuery';
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

  if (isLoading) return <LinearProgress />;

  console.log('data', data);
  
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
          />
          <Purchases 
            costMgtData={data}
          />
        
        </>

      )}
      

    </Stack>
  );
};