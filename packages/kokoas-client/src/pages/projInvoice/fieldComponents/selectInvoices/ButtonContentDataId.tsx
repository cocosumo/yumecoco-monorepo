import { Caption } from 'kokoas-client/src/components';
import { DataIds } from './ListItemInvoice';
import { Stack } from '@mui/system';
import { Chip } from '@mui/material';

export const ButtonContentDataId = ({
  estimateLists,
}: {
  estimateLists: DataIds[]
}) => {

  const estimateNum = estimateLists.length;

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
      <Caption text={`枝番: ${estimateLists[0].dataId}`} />
    </Stack>
  );
};