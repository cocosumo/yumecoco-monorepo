import { Stack } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { ReactNode, useState } from 'react';
import { useFileUploadHook } from 'react-use-file-upload/dist/lib/types';

export const UploadContainer = (props: useFileUploadHook & {
  children: ReactNode,
}) => {
  const { setSnackState } = useSnackBar();
  const [isDragging, setIsDragging] = useState(false);
  const {
    handleDragDropEvent,
    children,
  } = props;

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
        const fileType = e.dataTransfer.files?.[0]?.type;

        console.log('fileType', fileType);

        setSnackState({
          open: true,
          severity: 'warning',
          message: '当機能は開発中です。',

        });

        setIsDragging(false);
      }}
    >

      {children}

    </Stack>
  );
};