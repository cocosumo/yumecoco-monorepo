import { TableCell, TableRow } from '@mui/material';
import { TotalResultContainer } from './TotalResultContainer';
import { ValueWithUnit } from './ValueWithUnit';
import { useTotalResult } from '../../../../hooks/useTotalResult';

export const TotalResult = () => {

  const { data } = useTotalResult();

  const {
    totalAmtExclTax,
    totalAmtInclTax,
    totalNumOfContracts,
  } = data || {};

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
            value={totalAmtExclTax || 0}
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
            value={totalAmtInclTax || 0}
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
            value={totalNumOfContracts || 0}
            unit={'件'}
          />
        </TableCell>
      </TableRow>
    </TotalResultContainer>
  );
};