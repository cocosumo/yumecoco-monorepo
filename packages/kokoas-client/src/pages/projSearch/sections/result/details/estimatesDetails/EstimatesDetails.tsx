import { LinearProgress, Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { EmptyBox } from 'kokoas-client/src/components';

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
      />
     
      {isLoading && <LinearProgress />}

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


  );
};