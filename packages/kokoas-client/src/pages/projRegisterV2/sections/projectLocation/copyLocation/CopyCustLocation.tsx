import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopyCustLocation = () => {
  return (
    <Tooltip 
      title="顧客の現住所をコピーする"
      placement='top'
    >
      <Button 
        variant='outlined' 
        startIcon={<ContentCopyIcon />} 
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        顧客の現住所
      </Button>
    </Tooltip>
  );
};