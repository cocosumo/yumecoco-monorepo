import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { grey } from '@mui/material/colors';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const ListItemLayout = ({
  hasOtherAttachments,
  status,
  contractDate,
  contractAmount,
}:{
  hasOtherAttachments?: boolean,
  status: ReactNode,
  contractDate: ReactNode,
  contractAmount: ReactNode,
}) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
    >
      <Typography variant='caption' textAlign={'left'} width={'20%'}>
        {status}
      </Typography>
      <Typography variant='caption' textAlign={'center'} width={'30%'}>
        {contractDate}
      </Typography>
      <Typography variant='caption' textAlign={'right'} width={'50%'}>
        {contractAmount}
      </Typography>
      <Box minWidth={20} color={grey[600]} ml={1}>
        {hasOtherAttachments ? <AttachFileIcon /> : null}
      </Box>
    </Stack>
  );
};