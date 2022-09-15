import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import RenderRows from './RenderRows';
import { TypeOfForm } from '../form';
import { FieldArrayRenderProps } from 'formik';
import { QuoteTableHead } from './QuoteTableHead';

export type QuoteTableProps = {
  arrayHelpers: FieldArrayRenderProps,
  values: TypeOfForm,
};

/**
 * 見積もりテーブルを作成する
 * @param arrayHelpers
 * @returns
 */
export default function QuoteTable(props : QuoteTableProps) {
  const { arrayHelpers, values } = props;

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
        <TableBody>
          <RenderRows arrayHelpers={arrayHelpers} values={values} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}