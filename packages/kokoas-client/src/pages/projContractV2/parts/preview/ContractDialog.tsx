import { Chip, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { PreviewContent } from './PreviewContent';
import { PreviewHeader } from './PreviewHeader';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useState } from 'react';
import { DialogCloseButton } from 'kokoas-client/src/components';
import { ContractActionMenu } from './menu/ContractActionMenu';



export const ContractDialog = ({
  open,
  handleClose,
}: {
  open: boolean,
  handleClose: () => void,
}) => {

  
  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  }) as string;
  
  const { data: contractData } = useContractById(contractId);
  
  const {
    envDocFileKeys,
  } = contractData || {};

  const [selectedFileKey, setSelectedFileKey] = useState<string | null>(envDocFileKeys?.value?.[0]?.fileKey || null);
  
  const hasContractFiles = !!envDocFileKeys?.value.length;

  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'md'}
      disablePortal
      sx={{
        zIndex: 5001, // So it will be above the App bar
      }}
    >
      <DialogTitle>
        <PreviewHeader /> 
        <DialogCloseButton handleClose={handleClose} />
      </DialogTitle>

      <PreviewContent 
        contractId={contractId} 
        selectedFileKey={hasContractFiles ? selectedFileKey : null}
      />

      <DialogActions>
        {hasContractFiles && (
        <Stack 
          direction={'row'} 
          spacing={1} 
          py={1}
          px={2}
          alignItems={'center'}
        >
          {envDocFileKeys
            .value
            .map(({ name, fileKey }) => (
              <Chip 
                key={fileKey} 
                label={name.replace('.pdf', '')} 
                title={name}
                size={'small'}
                onClick={() => setSelectedFileKey(fileKey)}
                color={selectedFileKey === fileKey ? 'primary' : 'default'}
              />
            ))}
          <ContractActionMenu /> 
        </Stack>
        )}
      </DialogActions>
    </Dialog>

  );

};