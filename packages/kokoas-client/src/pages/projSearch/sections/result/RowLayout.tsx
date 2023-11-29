import { TableCell, TableRow } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';
import { KeyOfSearchResult } from '../../types';
import { styled } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';


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
  contractDate,
  custName,
  projName,
  custNameKana,
  procurementPaymentDateStart,
  procurementPaymentDateEnd,
  deliveryDate,
  //payFinDate,
  projFinDate,
  storeName,
  tel,
  telRelation,
  lastBillDate,
  createdAt,
  updatedAt,
  projDataId,
  receivableCompleteDate,
  onClick,
}: Partial<Record<KeyOfSearchResult, ReactNode>> & {
  onClick?: MouseEventHandler<HTMLTableRowElement>,
}) => {
  return (
    <StyledTableRow 
      onClick={onClick} 
      sx={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {storeName}
        <br />
        {projDataId}
      </TableCell>

      <TableCell sx={{
        minWidth: '150px',
      }}
      >
        {custNameKana}
        <br />
        {custName}
      </TableCell>

      <TableCell sx={{
        minWidth: '150px',
        maxWidth: '200px',
      }}
      >
        {projName}
      </TableCell>

      <TableCell sx={{
        whiteSpace: 'nowrap',
        maxWidth: '200px',
      }}
      >
        {tel}
        <br />
        {telRelation}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {contractDate}
      </TableCell>
      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {procurementPaymentDateStart}
        <br />
        {procurementPaymentDateEnd}
      </TableCell>


      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {lastBillDate}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {deliveryDate}
        <br />
        {projFinDate}   
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        {receivableCompleteDate}
      </TableCell>

      <TableCell
        sx={{
          whiteSpace: 'nowrap',
          fontSize: 10,
          color: grey[500],
        }}
      >
        {createdAt}
        <br />
        {updatedAt}
      </TableCell>
    </StyledTableRow>
  );
};

export type RowLayoutProps = Parameters<typeof RowLayout>[0];