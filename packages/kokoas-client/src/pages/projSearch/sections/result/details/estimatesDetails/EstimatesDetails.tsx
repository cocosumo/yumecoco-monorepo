import { Stack } from '@mui/material';
import { BranchList } from './BranchList';
import { EstimateContent } from './EstimateContent';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

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

  const {
    uuid: projEstimateId,
  } = selectedRecord ?? {};

  const handleSetIndex = (idx: number) => {
    setSelectedEstIdx(idx);
  };

  

  return (
    <Stack 
      spacing={2}
    >
      <EditButton href={`${pages.projEstimate}?${generateParams({ projEstimateId: projEstimateId?.value })}`} />
   
      <Stack 
        direction={'row'}
        pl={20}
      >
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
    </Stack>
  );
};