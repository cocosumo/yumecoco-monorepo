import { Box, Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';
import { OtherInfo } from './OtherInfo';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { NewButton } from '../common/NewButton';
import { ContractButton } from '../common/ContractButton';
import { ReactNode } from 'react';
import { ExportButton } from './ExportButton';

export const EstimateContent = (props: Partial<EstTableProps> & {
  projId: string,
  emptyNode?: ReactNode,
}) => {
  const {
    record,
    results,
    summary,
    projId,
    emptyNode,
  } = props;

  const {
    uuid: projEstimateId,
  } = record ?? {};



  return (
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

        <Stack 
          spacing={2} 
          direction={'row'}
          justifyContent={'flex-end'}
        >
          

          {projEstimateId?.value && (
            <>
              <ContractButton
                href={`${pages.projContractPreviewV2}?${generateParams({ projEstimateId: projEstimateId.value })}`}
                title='見積を利用して契約を作成する。'
              />

              <ExportButton
                projEstimateId={projEstimateId.value}
              />
            </>

          )}

          <NewButton 
            href={`${pages.projEstimate}?${generateParams({ projId })}`}
            title='見積を作成する'
          />
          
          {projEstimateId?.value && (
          <EditButton 
            href={`${pages.projEstimate}?${generateParams({ projEstimateId: projEstimateId?.value })}`}
            title='見積を編集する'
          />
          )}
    
        </Stack>
     
        {record && results && summary && (
        <EstimatesTable 
          record={record}
          results={results}
          summary={summary}
        />
        )}

        {emptyNode}

 
        {record && (
        <OtherInfo record={record}  />
        )}

      </Stack>
    </Box>
  );
};