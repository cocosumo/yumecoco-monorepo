import {  Badge, Button, Stack, Tooltip, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { downloadFile } from 'api-kintone';
import { bytesToIEC, downloadArrayBuffer } from 'libs';
import { StyledFileIcon } from './StyledFileIcon';
import { DeleteButton } from './DeleteButton';
import { FileName } from './FileName';


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

  return (
    <Tooltip 
      title={(
        <Stack>
          <Typography variant='inherit'>
            {fileName}
          </Typography>
          <Typography variant='inherit'>
            {bytesToIEC(fileSize)}
          </Typography>
          
        </Stack>
      )}
    >
      <Badge 
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        variant='standard' 
        overlap='circular' 
        badgeContent={(
          <DeleteButton 
            show={mouseEnter}
            fileName={fileName}
            fileKey={fileKey}
          />)}
      >

        <Button 
          sx={{
            mr: 1,
            mb: 1,
            display: 'inline-block',
          }}
          onClick={handleDownload}
        >

          <StyledFileIcon fileName={fileName} />

          <FileName fileName={fileName} />
      
        </Button>
      </Badge>

    </Tooltip>
  );
};