import { Chip, Stack, Tooltip } from '@mui/material';
import { useKintoneDownloadByFileKey } from 'kokoas-client/src/hooksQuery';
import { base64ToBlob } from 'libs/src/base64ToBlob';
import { useEffect, useState } from 'react';
import { IContracts } from 'types';

export const Files = ({
  files,
}:{
  files: IContracts['envDocFileKeys']
}) => {

  const [selectedFile, setSelectedFile] = useState({
    fileKey: '',
    name: '',
  });

  const { data: fileData } = useKintoneDownloadByFileKey(selectedFile.fileKey);

  useEffect(() => {
    if (!fileData) return;
    const binaryFile = base64ToBlob(fileData, 'application/pdf', selectedFile.name);
    const url = URL.createObjectURL(binaryFile);
    window.open(url, '_blank');

  }, [fileData, selectedFile.name]);

  return (
    <Stack 
      direction={'row'}
      spacing={2}
    >
      {files.value.map(({
        fileKey,
        name,
        size,
      }) => (
        <Tooltip key={fileKey} title={size}>
          <Chip
            label={name}
            size='small'
            key={fileKey}
            onClick={() => setSelectedFile({
              fileKey,
              name,
            })}
          />
        </Tooltip>))}
    </Stack>
  );
};