import { Table, TableContainer } from '@mui/material';
import { ColHeaders } from './ColHeaders';
import { TBody } from './TBody';
import { blue, grey } from '@mui/material/colors';
import styles from './ResultTable.module.css';

export const ResultTable = () => {
  return (
    <TableContainer
      sx={{
        '& .MuiTableCell-root': {
          border: 1,
          borderColor: grey[500],
        },
        '& .MuiTableCell-head': {
          fontWeight: 'bold',
        },
        '& th' : {
          backgroundColor: blue[50],
          px: 0.5,
        },
        '& table *': {
          fontFamily: '"メイリオ","Hiragino Kaku Gothic ProN",Meiryo,sans-serif',
        },
      }}
      className={styles.resultTableContainer}
    >
      <Table size='small' className={styles.resultTable}>
        <ColHeaders />
        <TBody />
      </Table>
    </TableContainer>);
};