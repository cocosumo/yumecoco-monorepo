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
import { NewButton } from '../common/NewButton';

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
      height={'100%'}
      spacing={2}
      direction={'row'}
    >
      {records && (
        <ContractList 
          handleSetIndex={setSelectedIdx}
          selectedIndex={selectedIdx}
          records={records}
        />)}


      <Stack 
        spacing={2}
        py={2}
        pr={2}
        width={'100%'}
        sx={{
          overflowY: 'auto',
        }}
      >
        <Stack 
          direction={'row'} 
          spacing={2}
          justifyContent={'flex-end'}
        >
          <NewButton 
            href={`${pages.projContractPreviewV2}?${generateParams({ projId })}`}
            title='当プロジェクトを利用し、契約書を作成します。金額は手打ちになります。見積と紐づく場合、見積タブで「契約」ボタンを押してください。'
          />
          {contractId?.value && (
          <EditButton 
            href={`${pages.projContractPreviewV2}?${generateParams({ contractId: contractId?.value })}`}
            title='契約書を編集する'
          />
          )}
       
        </Stack>

        {selectedRecord && (
        <>
          <ContractInfo record={selectedRecord} />
          <AmountInfo record={selectedRecord} />
          <PaymentInfo record={selectedRecord} />
          <SchedInfo record={selectedRecord} />

          
          <OtherInfo record={selectedRecord} />
            
        </>
        )}

      </Stack>

    </Stack>
  );
};