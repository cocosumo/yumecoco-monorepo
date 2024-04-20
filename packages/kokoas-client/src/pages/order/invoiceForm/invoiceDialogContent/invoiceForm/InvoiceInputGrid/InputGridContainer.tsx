import { Stack } from '@mui/material';
import { blue, grey, orange, red } from '@mui/material/colors';
import { ReactNode } from 'react';

export const InputGridContainer = ({
  children,
}: {
  children: ReactNode;
}) => {


  return (
    <Stack
      spacing={1}
      width={'100%'}
      height={'50%'}
      sx={{
        '& .rdg-cell.no-ellipsis' : {
          // Remove ellipsis from cell
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'clip',
        },
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
        '& .rdg-row:nth-of-type(odd):not(:hover) ' : {
          bgcolor: orange[50],
        },
        '& div[role="row"]:not(:hover) div[aria-readonly="true"]': {
          // 読み取り専用セル
          bgcolor: `${grey[100]} !important`,
        },
        '& div[role="row"] > div[role="gridcell"].rdg-cell.error-cell': {
          // エラーがあるセル
          bgcolor: `${red[50]} !important`,
          border: `4px solid ${red[300]}`,
        },
        '& div[row="columnheader"]': {
          bgcolor: grey[600],
        },
        '& .row-dragging': {
          opacity: 0.5,
          cursor: 'grabbing',
        },
        '& .row-over .rdg-cell': {
          borderBottom: `2px solid ${blue[500]}`,
        },
        '& div[role="row"] .rdg-cell:first-of-type' :{
          cursor: 'grab',
        },
        '& div[role="row"]:not(.rdg-header-row):hover' :{
          bgcolor: blue[50],
        },
        '& .rdg-cell-dragged-over': {
          bgcolor: `${blue[100]} !important`,
          border: `1px dashed ${blue[500]}`,
        },
      }}
    
    >
      {children}
    </Stack>
  );
};