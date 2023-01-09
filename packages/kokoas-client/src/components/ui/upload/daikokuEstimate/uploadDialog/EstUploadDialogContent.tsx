import React, { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Stack, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { EstUploadInput } from './EstUploadInput';
import { EstSelectProject } from './EstSelectProject';
import { useSnackBar } from 'kokoas-client/src/hooks';

export const EstUploadDialogContent = () => {
  const fileUploadReturn = useFileUpload();
  const { setSnackState } = useSnackBar();

  const {
    files,
    handleDragDropEvent,
    createFormData,
    setFiles,

  } = fileUploadReturn;

  const hasFile = !!files.length;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const formData = createFormData();
    try {
      /* axios.post('https://some-api.com', formData, {
        'content-type': 'multipart/form-data',
      }); */
      console.log(formData);
      console.log(files);
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };



  return (
    <Stack
      spacing={2}
      height={'100%'}
      alignItems={'center'} // center children, but bypassed default behavior of flex where children take full width.
    >
      <Stack
        spacing={2}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
        width={'100%'} // needed when using alignItems
        sx={{
          border: 2,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: grey[200],
        }}
        onDragEnter={(e) => {
          handleDragDropEvent(e as unknown as Event);
        }}
        onDragOver={(e) => {
          handleDragDropEvent(e as unknown as Event);
          console.log(e.dataTransfer.types);
        }}
        onDrop={(e) => {
          handleDragDropEvent(e as unknown as Event);
          const fileType = e.dataTransfer.files?.[0]?.type;
          if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setFiles(e as unknown as Event);
          } else {
            setSnackState({
              open: true,
              severity: 'error',
              message: 'エクセルファイルをアップロードしてください。',

            });
          }

        }}
      >
        {!!hasFile && <EstSelectProject {...fileUploadReturn} />}
        {!hasFile && <EstUploadInput {...fileUploadReturn} inputRef={inputRef} />}
      </Stack>


      <Button
        variant='contained'
        fullWidth={false}
        onClick={(e)=>handleSubmit(e as unknown as Event)}
        disabled={!hasFile}
      >
        アップロード
      </Button>

    </Stack>
  );
};