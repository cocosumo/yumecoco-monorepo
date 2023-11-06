import { Alert, AlertTitle, Button } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { useContractProjPlanByProjId } from '../../hooks/useContractProjPlanByProjId';
import { jaEnvelopeStatus } from 'kokoas-client/src/lib';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { TEnvelopeStatus } from 'types';

export const HasProjPlan = () => {
  const [
    projId,
    contractType,
    envelopeStatus,
    contractId,
  ] = useTypedWatch({
    name: [
      'projId',
      'contractType',
      'envelopeStatus',
      'contractId',
    ],
  }) as [
    string, 
    string, 
    TEnvelopeStatus, 
    string];
  
  const { data } = useContractProjPlanByProjId({
    projId, 
    contractId,
    enabled: contractType === '契約' && !envelopeStatus, // 本契約で未処理の契約の場合のみ、警告を出す
  });

  if (!data) return null;

  const contractStatusJa = jaEnvelopeStatus(data.envelopeStatus.value).ja;

  
  return (
    <Alert 
      severity='warning'
      action={(
        <Button 
          color='inherit' 
          size='small'
          variant='outlined'
          href={`#${pages.projContractPreviewV2}?${generateParams({ contractId: data.uuid.value })}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          設計契約書を見る
        </Button>
      )}
    >
      <AlertTitle>
        {`設計契約書（${contractStatusJa}）が存在しています。設計契約金額（税込）: ${(+(data.totalContractAmt.value)).toLocaleString()} 円`} 
      </AlertTitle>
      この契約書には、「設計契約」の契約金額は含まれません。
    </Alert>
  );
};