import { TableCell, TableRow } from '@mui/material';
import { TotalResultContainer } from './TotalResultContainer';
import { ValueWithUnit } from './ValueWithUnit';

export const TotalResult = () => {
  return (
    <TotalResultContainer>
      <TableRow>
        <TableCell 
          component={'th'}
        >
          ここすも総合計(税抜)
        </TableCell>
        <TableCell align='right'>
          <ValueWithUnit
            value={12121212}
            unit={'円'}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell component={'th'}>
          ここすも総合計(税込)
        </TableCell>
        <TableCell align='right'>
          <ValueWithUnit
            value={12121212}
            unit={'円'}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell component={'th'}>
          合計件数
        </TableCell>
        <TableCell align='right'>
          <ValueWithUnit
            value={63}
            unit={'件'}
          />
        </TableCell>
      </TableRow>
    </TotalResultContainer>
  );
};