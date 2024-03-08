import { Box, Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { EmptyBox } from 'kokoas-client/src/components';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { EstimateActions } from './EstimateActions';

export const EstimatesDetails = ({
  projId,
}:{
  projId: string
}) => {
  const { data, isLoading } = useEstimatesByProjId(projId, true);
  const {
    records,
    calculated,
  } = data ?? {};

  const [selectedEstIdx, setSelectedEstIdx] = useState(0);

  const selectedRecord = records?.[selectedEstIdx];
  const { 
    details: selectedRecordCal,
    summary: selectedRecordSummary,
  } = calculated?.[selectedEstIdx] ?? {};


  const handleSetIndex = (idx: number) => {
    setSelectedEstIdx(idx);
  };

  const {
    uuid: projEstimateId,
  } = selectedRecord ?? {};  

  return (

    <Stack 
      height={'100%'} 
      direction={'row'} 
      spacing={2}
    >
        
    
      <BranchList 
        handleSetIndex={handleSetIndex} 
        records={records}
        selectedIndex={selectedEstIdx}
        projId={projId}
      />


      <Box 
        height={'100%'}
        width={'100%'} 
        py={2}
        pr={2}
        sx={{
          overflowY: 'scroll',
        }}
      >

        <Stack spacing={2}>
          <EstimateActions 
            projEstimateId={projEstimateId?.value}
            projId={projId}
          />

          {isLoading && (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
          >
            <Loading />
          </Stack>)}

          {!isLoading && (
          <EstimateContent 
            record={selectedRecord}
            results={selectedRecordCal}
            summary={selectedRecordSummary}
            projId={projId}
            emptyNode={!records?.length && (
            <EmptyBox>
              見積もりがありません
            </EmptyBox>
            )}
          />
          )}
        </Stack>

      </Box>

    </Stack>
    


  );
};