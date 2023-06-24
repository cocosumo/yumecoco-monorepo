import { Button, Stack, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export const CopyProjLocation = () => {
  return (
    <Stack direction={'row'} spacing={2}>

      <Tooltip title="過去の工事情報から参照する">
        <Button 
          variant='outlined' 
          startIcon={<ContentCopyIcon />} 
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          過去の工事情報からコピー
        </Button>
      </Tooltip>

      <Tooltip title="顧客の現住所をコピーする">
        <Button 
          variant='outlined' 
          color='primary'
          startIcon={<ContentCopyIcon />} 
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          現住所をコピーする
        </Button>
      </Tooltip>
    </Stack>

  );
};