import { TableCell, TableHead, TableRow } from '@mui/material';
import { materialsNameList } from '../constantDefinition';

export const QuoteTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='none' />

        {materialsNameList.map((item)=>{
          return (<TableCell key={`${item}_header`}>
            {item}
          </TableCell>);
        })}
      </TableRow>
    </TableHead>
  );
};