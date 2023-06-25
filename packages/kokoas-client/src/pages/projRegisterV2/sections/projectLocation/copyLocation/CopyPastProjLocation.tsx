import { Button, Dialog, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const CopyPastProjLocation = () => {
  return (
    <>
      <Tooltip title="過去の工事情報から住所をコピーする">
        <Button 
          variant='outlined' 
          startIcon={<ContentCopyIcon />} 
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          過去の工事
        </Button>
      </Tooltip>
      Hello
    </>
  );
};