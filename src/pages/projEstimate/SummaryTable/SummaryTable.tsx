import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { summaryNameList } from '../constantDefinition';
import DisplayCellContent from './DisplayCellContent';
import { useTotalCalc } from '../hooks/useTotalCalc';

export default function SummaryTable() {

  const total = useTotalCalc();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {summaryNameList.map((item) => {
              return (<TableCell key={`${item}_header`}>
                <Typography variant="subtitle2" gutterBottom>
                  {item}
                </Typography>
              </TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {total.map(([key, value]) => {
              return (
                <TableCell key={`${key}_header`}>
                  <DisplayCellContent name={key} value={value} />
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}