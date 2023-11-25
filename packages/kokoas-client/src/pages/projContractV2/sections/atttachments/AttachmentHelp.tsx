import { Stack, Tooltip, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

export const AttachmentHelp = () => {
  
  return (
    <Tooltip title={'覚書など添付可能です。（5Mbまで可能）'}>
      <Stack 
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Typography variant='inherit'>
          覚書添付
        </Typography>
      
        <HelpIcon color='secondary' sx={{ cursor: 'help' }} />
      </Stack>
    </Tooltip> 
  );
};