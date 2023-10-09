import { TableCell, TableRow } from '@mui/material';
import { TotalResultContainer } from './TotalResultContainer';
import { ValueWithUnit } from './ValueWithUnit';
import { useTotalResult } from '../../../../hooks/useTotalResult';
import { TerritorySummary } from './TerritorySummary';

export const TotalResult = () => {



  const {
    totalAmtExclTax,
    totalAmtInclTax,
    totalNumOfContracts,
    eastRecords,
    westRecords,

    eastTotalAmtInclTax,

    westTotalAmtInclTax,

  } = useTotalResult() || {};

  return (
    <TotalResultContainer>
      <TerritorySummary 
        records={westRecords || []}
        territory={'西'}
        value={westTotalAmtInclTax || 0}
      />

      <TerritorySummary 
        records={eastRecords || []}
        territory={'東'}
        value={eastTotalAmtInclTax || 0}
      />

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


    </TotalResultContainer>
  );
};