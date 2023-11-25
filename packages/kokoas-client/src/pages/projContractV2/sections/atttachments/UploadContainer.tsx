import { Button, Stack, Typography } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { useUploadContractOtherFiles } from 'kokoas-client/src/hooksQuery';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';
import { useTypedWatch } from '../../hooks/useTypedRHF';

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
      spacing={2}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      minHeight={150}
      width={'100%'} // needed when using alignItems
      overflow={'hidden'}
      bgcolor={'white'}
      sx={{
        background: isDragging ? yellow[100] : undefined,
        border: isDragging ? 4 : 1,
        borderRadius: 1,
        borderStyle: 'dashed',
        borderColor: grey[200],
        transition: 'all 0.5s ease',
        '& > div ' : {
          pointerEvents: isDragging ? 'none' : undefined, // stop propagating events to child elements
        },
      }}
      onDragEnter={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        handleDragDropEvent(e as unknown as Event);
      }}
      onDrop={(e) => {
        handleDragDropEvent(e as unknown as Event);
        setFiles(e as unknown as Event);

        setIsDragging(false);
      }}
    >

      {children}
      <Stack >
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
      </Stack>

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