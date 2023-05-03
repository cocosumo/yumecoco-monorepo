import { Chip, Dialog, DialogActions, DialogTitle, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PreviewContent } from './PreviewContent';
import { PreviewHeader } from './PreviewHeader';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useState } from 'react';



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

  console.log(envDocFileKeys);


  const [selectedFileKey, setSelectedFileKey] = useState<string | null>(envDocFileKeys?.value?.[0]?.fileKey || null);
  
  const hasContractFiles = !!envDocFileKeys?.value.length;

  console.log(envDocFileKeys);
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
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <PreviewContent 
        contractId={contractId} 
        selectedFileKey={selectedFileKey}
      />

      <DialogActions>
        {hasContractFiles && (
        <Stack direction={'row'} spacing={1} py={1}
          px={2}
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
        </Stack>
        )}
      </DialogActions>
    </Dialog>

  );

};