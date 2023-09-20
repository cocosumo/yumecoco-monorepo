import { TableCell, TableRow } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { KSearchResult } from '../types';
import { ReactNode } from 'react';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: grey[50],
  },
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
  // hide last border
  '&:last-child td': {
    border: 0,
  },

  '&:hover': {
    backgroundColor: blue[50],
  },
}));

export const RowLayout = ({
  rank,
  custNames,
  projName,
  cocoAG,
  storeName,
  yumeAG,
  cocoConst,

  schedContractAmt,
  
  estatePurchaseDate,
  planApplicationDate,
  schedContractDate,


  updateDate,
  createDate,

  onClick,
}: Partial<Record<KSearchResult, ReactNode>> & {
  onClick?: () => void,
}) => {
  
  return (
    <StyledTableRow onClick={onClick} sx={{
      cursor: onClick ? 'pointer' : 'default',
    }}
    >
      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
        }}
        align='center'
      >
        {rank}
      </TableCell>

      <TableCell>
        {projName} 
        <br /> 
        {custNames}
      </TableCell>

      <TableCell>
        {cocoAG}
      </TableCell>

      <TableCell>
        {storeName}
        <br />
        {yumeAG}
        <br />
        {cocoConst}
      </TableCell>

      <TableCell align='right'>
        {schedContractAmt}
      </TableCell>

      <TableCell>
        {estatePurchaseDate}
        <br />
        {planApplicationDate}
        <br />
        {schedContractDate}
      </TableCell>
      
      <TableCell 
        sx={{
          whiteSpace: 'nowrap',
          fontSize: 10,
          color: grey[500],
        }}
        align='right'
      >
        {createDate}
        <br />
        {updateDate}
      </TableCell>
    </StyledTableRow>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];