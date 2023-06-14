import { Box, Stack } from '@mui/material';
import { EstTableProps, EstimatesTable } from './estimatesTable/EstimatesTable';
import { OtherInfo } from './OtherInfo';
import { EditButton } from '../common/EditButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const EstimateContent = (props: EstTableProps) => {
  const {
    record,
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
        overflowY: 'auto',
      }}
    >
      <Stack spacing={2}>

     
        <EditButton href={`${pages.projEstimate}?${generateParams({ projEstimateId: projEstimateId?.value })}`} />
      
        <EstimatesTable {...props} />
        {record && (
        <OtherInfo record={record} />
        )}

      </Stack>
    </Box>
  );
};