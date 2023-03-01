import { Caption } from 'kokoas-client/src/components';
import { DataIds } from './ListItemInvoices';
import { Stack } from '@mui/system';
import { Chip } from '@mui/material';

export const ButtonContentDataId = ({
  estimateLists,
}: {
  estimateLists: DataIds[]
}) => {
  const sortedEstimates = estimateLists.sort((a: DataIds, b: DataIds) => {
    return +b.billingAmount - +a.billingAmount;
  });

  const estimateNum = sortedEstimates.length;

  return (

    <Stack
      direction={'row'}
      spacing={1}
      alignItems="center"
      justifyContent="flex-start"
      width={'100%'}
    >
      <Chip
        label={estimateNum}
        color={'default'}
        size={'small'}
      />
      <Caption text={`枝番: ${sortedEstimates[0].dataId}`} />
    </Stack>
  );
};