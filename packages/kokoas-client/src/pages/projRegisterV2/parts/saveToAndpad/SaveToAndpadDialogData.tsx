import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { red } from '@mui/material/colors';
import { SaveProjectData } from 'api-andpad';



export const SaveToAndpadDialogData = ({
  convertedData,
} : {
  convertedData: SaveProjectData
}) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>

          {Object.entries(convertedData).map(([key, val]) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" 
                sx={{ color: !val ? red[500] : 'inherit' }}
              >
                {key}
              </TableCell>
              <TableCell align="left"
                sx={{ color: !val ? red[500] : 'inherit' }}
              >
                {val || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>);
};