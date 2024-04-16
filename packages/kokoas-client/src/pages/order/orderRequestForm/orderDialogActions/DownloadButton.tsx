import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const DownloadButton = () => {

  return (
    <Button 
      color={'info'} 
      variant={'contained'}
      onClick={() => alert('未実装です。もうしばらくお待ちください。')}
      startIcon={<FileDownloadIcon />}
    >
      発注書発行
    </Button>
  );
};