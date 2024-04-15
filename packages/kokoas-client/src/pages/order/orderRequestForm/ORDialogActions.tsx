import { Button, DialogActions } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SaveIcon from '@mui/icons-material/Save';

export const ORDialogActions = () => {
  return (
    <DialogActions
      sx={{
        justifyContent: 'center',
      }}
    >
      <Button 
        color={'info'} 
        variant={'contained'}
        onClick={() => alert('未実装です。もうしばらくお待ちください。')}
        startIcon={<SaveIcon />}
      >
        保存
      </Button>
      <Button 
        color={'info'} 
        variant={'contained'}
        onClick={() => alert('未実装です。もうしばらくお待ちください。')}
        startIcon={<FileDownloadIcon />}
      >
        発注書発行
      </Button>
    </DialogActions>
  );
};