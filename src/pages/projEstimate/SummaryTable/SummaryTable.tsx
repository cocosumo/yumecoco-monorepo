import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { summaryLabelList, summaryNameList } from '../constantDefinition';
import { getFieldName } from '../form';

export default function SummaryTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {summaryNameList.map((item)=>{
              return (<TableCell key={`${item}_header`}>{item}</TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {summaryLabelList.map((item)=>{
              return (<TableCell key={`${item}_header`}>{item}</TableCell>);
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}