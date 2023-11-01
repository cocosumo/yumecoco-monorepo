import { Chip, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { PreviewContent } from './PreviewContent';
import { PreviewHeader } from './PreviewHeader';
import { useContractById, useContractFilesById, useKintoneFileBase64 } from 'kokoas-client/src/hooksQuery';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useEffect, useState } from 'react';
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
    $revision,
    envelopeStatus,
  } = contractData || {};

  const [selectedFileKey, setSelectedFileKey] = useState<string | null>(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  
  useEffect(() => {
    if (envDocFileKeys?.value?.length) {
      setSelectedFileKey(envDocFileKeys?.value?.[0]?.fileKey);
    } else {
      setSelectedFileKey(null);
    }
  }, [
    envDocFileKeys,
  ]);

  
  const hasContractFiles = !!envDocFileKeys?.value.length;
  const isFileKeyIncluded = envDocFileKeys?.value?.some(({ fileKey }) => fileKey === selectedFileKey);

  const { data: fileData } = useContractFilesById({ 
    id: contractId, 
    revision: $revision?.value || '',
    enabled: !isFileKeyIncluded && open, // disable when selectedFileKey is not included in envDocFileKeys
  });

  
  const { data: fileB64 } = useKintoneFileBase64(
    selectedFileKey || '', 
    isFileKeyIncluded && open,
  );


  const {
    documents,
    recipients,
  } = fileData || {};

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
      keepMounted={false}
      
    >
      <DialogTitle>
        <PreviewHeader recipients={recipients} /> 
        <DialogCloseButton handleClose={handleClose} />
      </DialogTitle>

      <PreviewContent 
        documentB64={envelopeStatus?.value 
          ? fileB64 || documents?.[selectedFileIndex]?.data || null 
          : documents?.[selectedFileIndex]?.data || null}
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

        {!hasContractFiles && !!documents && (
          <Stack 
            direction={'row'} 
            spacing={1} 
            py={1}
            px={2}
            alignItems={'center'}
          >
            {documents.map((doc, index) => (
              <Chip 
                key={doc.key} 
                label={doc.fileName} 
                size={'small'}
                onClick={() => setSelectedFileIndex(index)}
                color={selectedFileIndex === index ? 'primary' : 'default'}
              />
            ))}
  
          </Stack>
        )}
      </DialogActions>
    </Dialog>

  );

};