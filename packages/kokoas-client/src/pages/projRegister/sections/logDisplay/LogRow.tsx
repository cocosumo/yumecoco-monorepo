import { Box, Stack } from '@mui/material';
import format from 'date-fns/format';
import { Log } from '../../form';

export const LogRow = ({
  dateTime,
  log,
}: Log) => {
  return (
    <Stack direction={'row'}>
      <Box width={'15%'}>
        {!!dateTime && format(dateTime, 'yyyy/MM/dd HH:mm')}
      </Box>
      <Box>
        {log}
      </Box>
    </Stack>
  );
};