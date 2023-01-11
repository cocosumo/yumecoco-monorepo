
import useFileUpload from 'react-use-file-upload';
import { Stack } from '@mui/material';
import { EstUploadInput } from './EstUploadInput';
import { EstSelectProject } from './EstSelectProject';
import { EstDragAreaContainer } from './EstDragAreaContainer';
import { useUploadDaikokuEst } from 'kokoas-client/src/hooksQuery';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { Steps } from './Steps';

export const EstUploadDialogContent = () => {
  const fileUploadReturn = useFileUpload();
  const {
    files,
  } = fileUploadReturn;

  const hasFile = !!files.length;

  const { projId } = useURLParams();

  const {
    mutate,
  } = useUploadDaikokuEst();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    mutate({
      projId: projId ?? '',
      fileBlob: files[0],
    });
  };

  return (
    <Stack
      spacing={2}
      height={'100%'}
      alignItems={'center'} // center children, but bypassed default behavior of flex where children take full width.
    >
      <Steps />
      <EstDragAreaContainer {...fileUploadReturn} >
        {!!hasFile && <EstSelectProject {...fileUploadReturn} />}
        {!hasFile && <EstUploadInput {...fileUploadReturn} />}

      </EstDragAreaContainer>

      {/*       <Button
        variant='contained'
        fullWidth={false}
        onClick={(e)=>handleSubmit(e as unknown as Event)}
        disabled={!hasFile}
      >
        アップロード
      </Button> */}

    </Stack>
  );
};