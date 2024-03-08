import { Stack } from '@mui/material';
import { ContractButton } from '../common/ContractButton';
import { ExportButton } from './ExportButton';
import { NewButton } from '../common/NewButton';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';

export const EstimateActions = ({
  projEstimateId,
  projId,
}:{
  projEstimateId: string | undefined,
  projId: string
}) => {
  return (
    <Stack 
      spacing={2} 
      direction={'row'}
      justifyContent={'flex-end'}
    >
          

      {projEstimateId && (
      <>
        <ContractButton
          href={`${pages.projContractPreviewV2}?${generateParams({ projEstimateId })}`}
          title='見積を利用して契約を作成する。'
        />

        <ExportButton
          projEstimateId={projEstimateId}
        />
      </>

      )}

      <NewButton 
        href={`${pages.projEstimate}?${generateParams({ projId })}`}
        title='見積を作成する'
      />
          
      {projEstimateId && (
      <EditButton 
        href={`${pages.projEstimate}?${generateParams({ projEstimateId })}`}
        title='見積を編集する'
      />
      )}
    
    </Stack>
  );
};