import { TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { summaryNameList } from '../constantDefinition';
import DisplayCellContent from './DisplayCellContent';
import { useTotalCalc } from '../hooks/useTotalCalc';
import { SummaryTableContainer } from './SummaryTableContainer';

export default function SummaryTable() {

  const total = useTotalCalc();


  return (
    <SummaryTableContainer >
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
    </SummaryTableContainer>
  );
}