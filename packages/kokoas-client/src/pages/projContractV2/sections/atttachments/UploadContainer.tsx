import { Button, Stack, Tooltip, Typography } from '@mui/material';
import {  green, grey, yellow } from '@mui/material/colors';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { DraggingInfo } from './DraggingInfo';
import { useUploadContractOtherFiles } from './useUploadContractOtherFiles';


export const UploadContainer = (props: useFileUploadHook & {
  children: ReactNode,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { mutate } = useUploadContractOtherFiles();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contractId = useTypedWatch({
    name: 'contractId',
  }) as string;

  const {
    handleDragDropEvent,
    children,
    files,
    setFiles,
    clearAllFiles,
  } = props;


  useEffect(() => {
    if (!files.length || !contractId) return;

    const documents = files.map((file) => ({
      name: file.name,
      data: file,
    }));

    mutate({
      documents,
      contractId,
    });

    clearAllFiles();
  
  }, [files, mutate, setFiles, clearAllFiles, contractId]);

  return (
    <Stack
      className='dropzone'
      spacing={2}
      justifyContent={!children || isDragging ? 'center' : 'space-between'}
      alignItems={!children || isDragging  ? 'center' : undefined}
      height={'100%'}
      minHeight={150}
      width={'100%'} // needed when using alignItems
      overflow={'hidden'}
      bgcolor={isDragging ? green[100] : yellow[50]}
      p={2}
      sx={{
        border: 4,
        borderRadius: 1,
        borderColor: isDragging ? green[500] : grey[300],
        borderStyle: 'dashed',
        transition: 'all 0.3s ease',
        '& div, & p' : {
          pointerEvents: isDragging ? 'none' : undefined, // stop propagating events to child elements
        },
      }}
      onDragEnter={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        handleDragDropEvent(e as unknown as Event);
        if ((e.target as HTMLElement).classList.contains('dropzone')) {
          setIsDragging(false);
        }

      }}
      onDragOver={(e) => {
        handleDragDropEvent(e as unknown as Event);

        //setIsDragging(true);

      }}
      onDrop={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setFiles(e as unknown as Event);
        setIsDragging(false);
      }}
    >
      


      {!!children && (
        <>
          {children}
    
          {!isDragging && (
          <Tooltip title={'ドラッグ＆ドロップまたはファイルを選択'}>
            <Button
              variant='outlined'
              startIcon={<NoteAddIcon />}
              onClick={() => inputRef.current?.click()}
              size='small'
              sx={{
                width: 'fit-content',
                height: 30, // prevent layout shift when dragging
              }}
            >
              追加
            </Button>
          </Tooltip>
          )}

        </>
      )}

      {isDragging && (
      <DraggingInfo  />

      )}

      {!children && !isDragging && (
      <>
        <Typography color={'GrayText'}>
          ドラッグ＆ドロップ
        </Typography>
        <Typography color={'GrayText'}>
          または 

          <Button 
            variant='outlined' 
            color='secondary'
            onClick={() => inputRef.current?.click()}
            sx={{
              ml: 1,
            }}
            size='small'
          >
            ファイルを選択
          </Button>
        </Typography>
        </>
      )}


      {/* Hide the crappy looking default HTML input */}

      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          setFiles(e as unknown as Event);
          if (!inputRef.current) return;

          inputRef.current.value = null as unknown as string;
        }}
      />

      
    </Stack>
  );
};