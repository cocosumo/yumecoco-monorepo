import useFileUpload from 'react-use-file-upload';
import { UploadContainer } from './UploadContainer';
import { FormHelperText, Stack } from '@mui/material';

export const Attachments = () => {
  const fileUploadReturn = useFileUpload();


  return (
    <Stack>
      <FormHelperText>
        ※ 電子契約書は添付しないでください。
      </FormHelperText>
      <UploadContainer {...fileUploadReturn}>

      </UploadContainer>
    </Stack>

  );
};

