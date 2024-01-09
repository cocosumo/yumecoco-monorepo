import { Button, Stack, Tooltip } from '@mui/material';
import { downloadFile } from 'api-kintone';
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

  const handleDownload = async () => {
    const fileData = await downloadFile(fileKey);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([fileData], { type: 'application/pdf' }));
    link.download = fileName;
    link.click();
  };


  
  return (
    <Tooltip title={`${fileName} (${roundTo((fileSize / 1024), 2)?.toLocaleString()} KB)`}>
      <Button
        onClick={handleDownload}
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