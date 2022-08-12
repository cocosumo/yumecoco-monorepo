import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { materialsNameList } from '../form';
import RenderRows from './RenderRows';

export default function ExtimateTable(arrayHelpers) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {materialsNameList.map((item)=>{
              return (<TableCell key={`${item}_header`}>{item}</TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {RenderRows(arrayHelpers)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}