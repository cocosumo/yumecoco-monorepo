import { DialogContent } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useContractFilesById } from 'kokoas-client/src/hooksQuery';
import { Loading } from 'kokoas-client/src/components/ui/loading/Loading';

export const PreviewContent = () => {
  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  });

  const { data, isLoading } = useContractFilesById({ id: contractId as string });
  
  const {
    documents,
  } = data || {};

  const pdfUrl = `data:application/pdf;base64,${documents?.[0]}`;

  
  return (
    <DialogContent
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      {isLoading && (<Loading />)}
      {!isLoading && !documents && (
        'プレビューの生成が失敗しました。管理者にご連絡ください。'
      )}
      {!isLoading && documents && (
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