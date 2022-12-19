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
            px: 0.5,
          },
          '& tr:nth-of-type(odd) td:not(:nth-of-type(-n+3))' : {
            borderBottom: 'none',
            pt: 2,
            pb: 0,
          },
          '& tr:nth-of-type(even) td:not(:nth-of-type(-n+1))' : {
            pt: 1,
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