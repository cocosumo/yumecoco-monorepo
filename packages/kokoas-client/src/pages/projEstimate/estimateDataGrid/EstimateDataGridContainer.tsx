import { Box } from '@mui/material';
import { grey, orange } from '@mui/material/colors';
import { useAtomValue } from 'jotai';
import { drawerWidthAtom, menuAtom } from 'kokoas-client/src/components/MainScreen';
import { ReactNode } from 'react';


const menuOffsetWidth = 66;

export const EstimateDataGridContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const menuOpen = useAtomValue(menuAtom);
  const menuWidth = useAtomValue(drawerWidthAtom);
  return (
    <Box
      sx={{
        maxWidth: `calc(100vw - ${menuOpen ? menuWidth + menuOffsetWidth : menuOffsetWidth}px)`, 
        height: '70vh',
        '& .index' : {
          fontSize: 8,
          textAlign: 'center',
        },
        '& .index-header' : {
          bgcolor: grey[50],
          fontSize: 8,
          textAlign: 'center',
          px: 0,
        },
        // select odd rows, except the first column
        '& .rdg-row:nth-of-type(odd) .rdg-cell:not(:first-of-type):not(.rdg-editor-container):not([aria-readonly="true"])' : {
          bgcolor: orange[50],
        },
        '& div[aria-readonly="true"]': {
          bgcolor: grey[100],
        },
        '& div[row="columnheader"]': {
          bgcolor: grey[600],
        },
      }}
    
    >
      {children}

    </Box>
  );
};