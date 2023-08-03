import { DialogContent } from '@mui/material';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';
import { useIsFetching } from '@tanstack/react-query';

export const PreviewContent = ({
  documentB64,
}: {
  documentB64: string | null,  
}) => {
  const isFetching = !!useIsFetching();
  
  const pdfUrl = `data:application/pdf;base64,${documentB64}`;

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