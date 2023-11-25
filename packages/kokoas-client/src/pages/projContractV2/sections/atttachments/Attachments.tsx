import useFileUpload from 'react-use-file-upload';
import { UploadContainer } from './UploadContainer';
import { FormHelperText, Stack } from '@mui/material';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { File } from './File';
import Grid from '@mui/material/Unstable_Grid2';

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
          <Grid container spacing={2}>
            {otherAttachments.value.map((f) => (
              <Grid 
                xs={12}
                sm={6}
                md={4} 
                lg={3}
                key={f.fileKey}
              >
                <File 
                  contentType={f.contentType}
                  fileKey={f.fileKey}
                  fileName={f.name}
                  fileSize={+f.size}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </UploadContainer>
    </Stack>

  );
};

