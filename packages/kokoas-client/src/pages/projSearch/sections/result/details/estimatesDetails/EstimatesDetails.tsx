import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';

export const EstimatesDetails = ({
  projId,
}:{
  projId: string
}) => {
  const { data } = useEstimatesByProjId(projId, true);
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
        
      {records && (
        <BranchList 
          handleSetIndex={handleSetIndex} 
          records={records}
          selectedIndex={selectedEstIdx}
        />)}
        
      {selectedRecord && selectedRecordCal && selectedRecordSummary &&  (
        <EstimateContent 
          record={selectedRecord}
          results={selectedRecordCal}
          summary={selectedRecordSummary}
        />)}

    </Stack>


  );
};