import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { summaryLabelList, summaryNameList } from '../constantDefinition';
import DisplayCellContent from './DisplayCellContent';

export default function SummaryTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {summaryNameList.map((item)=>{
              return (<TableCell key={`${item}_header`}>
                <Typography variant="subtitle2" gutterBottom>{item}</Typography>
              </TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {summaryLabelList.map((item)=>{
              return (<TableCell key={`${item}_header`}>
                <DisplayCellContent name={item} />
              </TableCell>);
            })} 
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}