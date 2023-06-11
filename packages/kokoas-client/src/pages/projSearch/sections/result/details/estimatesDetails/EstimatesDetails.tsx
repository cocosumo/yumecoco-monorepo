import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';

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
  const selectedRecordCal = calculated?.[selectedEstIdx].details;

  const handleSetIndex = (idx: number) => {
    setSelectedEstIdx(idx);
  };

  return (
    <Stack direction={'row'}>
      {data && (
      <BranchList 
        handleSetIndex={handleSetIndex} data={data}
      />)}

      {selectedRecord && selectedRecordCal &&  (
      <EstimateContent 
        record={selectedRecord}
        results={selectedRecordCal}
      />)}
    </Stack>
  );
};