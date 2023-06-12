import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { EditButton } from '../common/EditButton';
import { OtherInfo } from './OtherInfo';

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

  const {
    uuid: projEstimateId,
  } = selectedRecord ?? {};

  const handleSetIndex = (idx: number) => {
    setSelectedEstIdx(idx);
  };

  

  return (
    <Stack 
      spacing={2}
      pl={21}
    >
      <EditButton href={`${pages.projEstimate}?${generateParams({ projEstimateId: projEstimateId?.value })}`} />
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
     
      {selectedRecord && (
      <OtherInfo record={selectedRecord} />
      )}
    </Stack>
  );
};