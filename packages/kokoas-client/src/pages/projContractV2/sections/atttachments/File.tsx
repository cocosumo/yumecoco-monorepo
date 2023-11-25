import { Chip } from '@mui/material';
import { useCallback, useState } from 'react';
import { downloadFile } from 'api-kintone';
import { downloadArrayBuffer } from 'libs';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DownloadIcon from '@mui/icons-material/Download';



export const File = ({
  fileName,
  fileKey,
  contentType,
}:{
  fileName: string,
  fileKey: string
  fileSize: number
  contentType: string
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  

  const handleDownload = useCallback(async () => {
    const arrayBuffer = await downloadFile(fileKey);

    downloadArrayBuffer(arrayBuffer, fileName, contentType);
    
  }, [fileKey, fileName, contentType]);

  return (
    <Chip 
      label={fileName}
      size="small"
      icon={mouseEnter ? <DownloadIcon /> :  <AttachmentIcon />}
      onClick={handleDownload}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    />
  );
};