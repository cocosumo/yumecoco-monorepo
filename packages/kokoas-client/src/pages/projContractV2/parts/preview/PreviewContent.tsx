import { DialogContent } from '@mui/material';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useContractFilesById } from 'kokoas-client/src/hooksQuery';

export const PreviewContent = () => {
  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  });

  const { data } = useContractFilesById({ id: contractId as string });
  
  console.log(data);
  
  return (
    <DialogContent
      sx={{
        height: '100vh',
        overflow: 'hidden',
        p: 0,
      }}
    >
      Helllo
    </DialogContent>
  );
};