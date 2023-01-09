import { Button, Stack, Typography } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderIcon from '@mui/icons-material/Folder';
import { RefObject } from 'react';


export const EstUploadInput = (
  props : useFileUploadHook & {
    inputRef: RefObject<HTMLInputElement>
  },

) => {

  const {
    inputRef,
    setFiles,
  } = props;


  const handleChange = (e: Event) => {
    console.log(e);
    setFiles(e as unknown as Event);
    console.log(e);
    //if (inputRef.current) {
    //  inputRef.current.value = '';
    //}
  };

  return (
    <Stack
      spacing={2}
      alignItems={'center'}
    >

      <FileUploadIcon fontSize={'large'} color={'secondary'} />

      <Typography textAlign={'center'} variant={'h5'}>
        ドラッグ＆ドロップ
      </Typography>

      <Typography textAlign={'center'}>
        又は
      </Typography>

      <Button
        onClick={() => inputRef.current?.click()}
        variant={'outlined'}
        startIcon={<FolderIcon />}
      >
        ファイルを選択
      </Button>

      {/* Hide the crappy looking default HTML input */}
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept=".xls,.xlsx"
        onChange={(e) => {
          handleChange(e as unknown as Event);
        }}
      />
    </Stack>

  );
};