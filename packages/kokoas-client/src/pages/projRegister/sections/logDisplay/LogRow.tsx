import { Box, Stack } from '@mui/material';
import format from 'date-fns/format';
import { Log } from '../../form';

export const LogRow = ({
  dateTime,
  log,
}: Log) => {
  return (
    <Stack direction={'row'}>
      <Box width={'20%'}>
        {!!dateTime && format(dateTime, 'yyyy/MM/dd HH:mm:ss')}
      </Box>
      <Box>
        {log}
      </Box>
    </Stack>
  );
};