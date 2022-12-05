import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { FieldArrayRenderProps } from 'formik';
import { QuoteTableHead, QuoteTableBody } from './';
import { QuoteTableActions } from './QuoteTableActions';


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
          '& td, th': {
            padding: 0.5,
          },
          '& tr:nth-of-type(odd) td:not(:nth-of-type(1))' : {
            borderBottom: 'none',
          },
          '& tr:nth-of-type(even) td' : {
            pb: 2,
          },
        }}
      >
        <QuoteTableHead />
        <QuoteTableBody arrayHelpers={arrayHelpers}  />

      </Table>
      <QuoteTableActions />

    </TableContainer>
  );
}