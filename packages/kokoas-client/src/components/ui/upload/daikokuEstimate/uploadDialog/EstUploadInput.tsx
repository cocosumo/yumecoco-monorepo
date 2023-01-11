import { Button, Stack, Typography } from '@mui/material';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FolderIcon from '@mui/icons-material/Folder';
import { useRef } from 'react';


export const EstUploadInput = (
  props : useFileUploadHook,
) => {

  const {
    setFiles,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: Event) => {
    setFiles(e as unknown as Event);
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