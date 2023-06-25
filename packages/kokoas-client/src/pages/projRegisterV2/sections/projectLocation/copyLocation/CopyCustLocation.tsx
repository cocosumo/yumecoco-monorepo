import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopyCustLocation = () => {
  return (
    <Tooltip title="顧客の現住所をコピーする">
      <Button 
        variant='outlined' 
        startIcon={<ContentCopyIcon />} 
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        現住所をコピーする
      </Button>
    </Tooltip>
  );
};