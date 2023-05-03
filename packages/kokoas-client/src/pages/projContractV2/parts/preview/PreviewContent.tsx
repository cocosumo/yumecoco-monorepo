import { DialogContent } from '@mui/material';
import { useContractFilesById, useKintoneDownloadByFileKey } from 'kokoas-client/src/hooksQuery';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useIsFetching } from '@tanstack/react-query';

export const PreviewContent = ({
  contractId,
  selectedFileKey,
}: {
  contractId: string,
  selectedFileKey: string | null,
}) => {
  const isFetching = !!useIsFetching();
  
  const { data: fileData } = useContractFilesById({ 
    id: contractId, 
    enabled: !selectedFileKey,
  });

  const { data: fileB64 } = useKintoneDownloadByFileKey(selectedFileKey || '');
  
  const {
    documents,
  } = fileData || {};

  const pdfUrl = `data:application/pdf;base64,${fileB64 || documents?.[0] }`;

  console.log('selectedFileKeyContent: ', selectedFileKey);
  return (
    <DialogContent
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      {isFetching && (<Loading />)}

      {!isFetching && (
        <object 
          data={pdfUrl} 
          type="application/pdf" 
          width="100%"
          height='100%'
        />
      )}

    </DialogContent>
  );
};