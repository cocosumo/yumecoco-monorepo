import { Alert, Box, Button, Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';
import { OtherInfo } from './OtherInfo';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { NewButton } from '../common/NewButton';
import { ContractButton } from '../common/ContractButton';
import { ReactNode } from 'react';

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
        <Alert
          action={
            <Button 
              color='inherit' 
              size='small'
              variant='outlined'
              href='https://rdmuhwtt6gx7.cybozu.com/k/177/#/project/estimate/register?projId=8f605463-6496-4099-a442-96947f9fadcf'
              target='_blank '
            >
              最新版を検証する
            </Button>
          } 
          severity='warning'
        >
          見積作成は改革中です。最新版は右のボタンで検証出来ます。案などは大井さんにご連絡ください。
        </Alert>

        <Stack 
          spacing={2} 
          direction={'row'}
          justifyContent={'flex-end'}
        >
          

          {projEstimateId?.value && (
          <ContractButton 
            href={`${pages.projContractPreviewV2}?${generateParams({ projEstimateId: projEstimateId.value })}`}
            title='（当機能は開発中です）見積を利用して契約を作成する。'
          />
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