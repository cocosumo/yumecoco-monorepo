import { Stack } from '@mui/material';

import { useContractsByProjIdV2 } from 'kokoas-client/src/hooksQuery';
import { EditButton } from '../common/EditButton';
import { ContractList } from './ContractList';
import { useState } from 'react';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { ContractInfo } from './ContractInfo';
import { AmountInfo } from './AmountInfo';
import { PaymentInfo } from './PaymentInfo';
import { OtherInfo } from './OtherInfo';
import { SchedInfo } from './SchedInfo';
import { Files } from './Files';

export const ContractDetails = ({
  projId,
}:{
  projId: string,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { data: records } = useContractsByProjIdV2(projId);

  const selectedRecord = records?.[selectedIdx];

  const {
    uuid: contractId,
  } = selectedRecord ?? {};

  return (
    <Stack 
      spacing={2}
      pl={28}
    >
      <EditButton href={`${pages.projContractPreviewV2}?${generateParams({ contractId: contractId?.value })}`} />
      {records && (
        <ContractList 
          handleSetIndex={setSelectedIdx}
          selectedIndex={selectedIdx}
          records={records}
        />)}

      {selectedRecord && (
        <>
          <ContractInfo record={selectedRecord} />
          <AmountInfo record={selectedRecord} />
          <PaymentInfo record={selectedRecord} />
          <SchedInfo record={selectedRecord} />
          <Files />
          <OtherInfo record={selectedRecord} />
        </>

      )}
    </Stack>
  );
};