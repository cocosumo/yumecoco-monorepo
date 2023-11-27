import useFileUpload from 'react-use-file-upload';
import { UploadContainer } from './UploadContainer';
import { Box, FormHelperText, Stack } from '@mui/material';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { File } from './file/File';

export const Attachments = () => {
  const fileUploadReturn = useFileUpload();
  const contractId = useTypedWatch({
    name: 'contractId',
  }) as string;
  const { data: contractRec } = useContractById(contractId);
  
  const {
    otherAttachments,
  } = contractRec ?? {};

  return (
    <Stack>
      <FormHelperText>
        ※ 電子契約書は添付しないでください。
      </FormHelperText>
      <UploadContainer {...fileUploadReturn}>
        {!!otherAttachments?.value.length && (
          <Box 
            width={'100%'}
            flexGrow={1}
          >
            {otherAttachments.value.map((f) => (
       
              <File 
                key={f.fileKey}
                contentType={f.contentType}
                fileKey={f.fileKey}
                fileName={f.name}
                fileSize={+f.size}
              />
            ))}
          </Box>
 
        )}
      </UploadContainer>
    </Stack>

  );
};

