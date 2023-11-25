import { Chip, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { downloadFile } from 'api-kintone';
import { downloadArrayBuffer, roundTo } from 'libs';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DownloadIcon from '@mui/icons-material/Download';



export const File = ({
  fileName,
  fileKey,
  fileSize,
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

  // bytes to kb
  const sizeKb = fileSize / 1024;

  return (
    <Tooltip title={`${fileName} (${roundTo(sizeKb).toLocaleString()} KB)`}>
      <Chip 
        label={fileName}
        size="small"
        icon={mouseEnter ? <DownloadIcon /> :  <AttachmentIcon />}
        onClick={handleDownload}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        sx={{
          mr: 1,
          mb: 1,
        }}
      />
    </Tooltip>
  );
};