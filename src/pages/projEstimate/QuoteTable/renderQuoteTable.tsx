import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { FieldArrayRenderProps } from 'formik';
import { QuoteTableHead, QuoteTableBody } from './';


/**
 * 見積もりテーブルを作成する
 * @param arrayHelpers
 * @returns
 */
export function renderQuoteTable(arrayHelpers : FieldArrayRenderProps) {

  return (
    <TableContainer component={Paper} >
      <Table 
        size="small" 
        sx={{ 
          minWidth: 650, 
          overflow: 'hidden',
        }} 
      >
        <QuoteTableHead />
        <QuoteTableBody arrayHelpers={arrayHelpers}  />
      </Table>
    </TableContainer>
  );
}