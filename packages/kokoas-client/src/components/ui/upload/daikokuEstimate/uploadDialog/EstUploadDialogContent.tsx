import React, { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Stack, Button } from '@mui/material';
import { EstUploadInput } from './EstUploadInput';
import { EstSelectProject } from './EstSelectProject';
import { EstDragAreaContainer } from './EstDragAreaContainer';

export const EstUploadDialogContent = () => {
  const fileUploadReturn = useFileUpload();
  const {
    files,
    createFormData,
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
      <EstDragAreaContainer {...fileUploadReturn} >
        {!!hasFile && <EstSelectProject {...fileUploadReturn} />}
        {!hasFile && <EstUploadInput {...fileUploadReturn} inputRef={inputRef} />}
      </EstDragAreaContainer>

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