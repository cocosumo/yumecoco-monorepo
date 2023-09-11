import { Button, CircularProgress, Stack, Tooltip } from '@mui/material';
import {  useKintoneFile } from 'kokoas-client/src/hooksQuery';
import { roundTo } from 'libs';
import { IContracts } from 'types';

const PDFLink = ({
  fileKey,
  fileName,
  fileSize,
}:{
  fileKey: string,
  fileName: string,
  fileSize: number,
}) => {
  const { data: fileData, isLoading } = useKintoneFile(fileKey);

  if (!fileData || isLoading) return <CircularProgress size={16} />;

  const url = URL.createObjectURL(new Blob([fileData], { type: 'application/pdf' }));
  
  return (
    <Tooltip title={`${fileName} (${roundTo((fileSize / 1024), 2)?.toLocaleString()} KB)`}>
      <Button
        href={url}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        variant="outlined"
        size="small"
        sx={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textAlign: 'left',
          display: 'inline-block',
          maxWidth: '150px',
        }}
      >
        {fileName}
      </Button>
    </Tooltip>
  );
};

export const Files = ({
  files,
}:{
  files: IContracts['envDocFileKeys']
}) => {

  return (
    <Stack direction="row" spacing={2}>
      {files.value.map(({ fileKey, name, size }) => (
        <PDFLink
          key={fileKey}
          fileKey={fileKey}
          fileName={name}
          fileSize={+size}
        />

      ))}
    </Stack>
  );
};