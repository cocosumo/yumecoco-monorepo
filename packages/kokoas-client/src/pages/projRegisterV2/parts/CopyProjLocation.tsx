import { Button, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export const CopyProjLocation = () => {
  return (
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
  );
};