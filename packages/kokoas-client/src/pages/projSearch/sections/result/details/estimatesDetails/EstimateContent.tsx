import { Box, Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';
import { OtherInfo } from './OtherInfo';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { NewButton } from '../common/NewButton';
import { ContractButton } from '../common/ContractButton';

export const EstimateContent = (props: EstTableProps) => {
  const {
    record,
  } = props;

  const {
    uuid: projEstimateId,
    projId,
  } = record ?? {};



  return (
    <Box 
      height={'100%'}
      width={'100%'} 
      py={2}
      pr={2}
      sx={{
        overflowY: 'auto',
      }}
    >
      <Stack spacing={2}>

        <Stack 
          spacing={2} 
          direction={'row'}
          justifyContent={'flex-end'}
        >
          <NewButton 
            href={`${pages.projEstimate}?${generateParams({ projId: projId.value })}`}
            title='見積を作成する'
          />
          <ContractButton 
            href={`${pages.projContractPreviewV2}?${generateParams({ projId: projId.value, projEstimateId: projEstimateId.value })}`}
            title='見積を利用して契約を作成する'
          />
          <EditButton 
            href={`${pages.projEstimate}?${generateParams({ projEstimateId: projEstimateId?.value })}`}
            title='見積を編集する'
          />
        </Stack>
     
      
        <EstimatesTable {...props} />
        {record && (
        <OtherInfo record={record} />
        )}

      </Stack>
    </Box>
  );
};