import { TableCell, TableRow } from '@mui/material';
import { TotalResultContainer } from './TotalResultContainer';
import { ValueWithUnit } from './ValueWithUnit';
import { useMemo } from 'react';
import { useContractsResult } from '../../../../hooks/useContractsResult';

export const TotalResult = () => {

  const { data } = useContractsResult();


  const {
    totalAmtInclTax,
    totalAmtExclTax,
    totalNumOfContracts,
  } = useMemo(() => {
    if (!data) return {
      totalAmtInclTax: 0,
      totalAmtExclTax: 0,
      totalNumOfContracts: 0,
    };

    return data?.reduce((acc, cur) => {
      const {
        contractAmountIntax,
        contractAmountNotax,
      } = cur;

      return {
        totalAmtInclTax: acc.totalAmtInclTax + +contractAmountIntax.value,
        totalAmtExclTax: acc.totalAmtExclTax + +contractAmountNotax.value,
        totalNumOfContracts: acc.totalNumOfContracts + 1,
      };
    }, {
      totalAmtInclTax: 0,
      totalAmtExclTax: 0,
      totalNumOfContracts: 0,
    });


  }, [data]);

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
            value={totalAmtExclTax}
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
            value={totalAmtInclTax}
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
            value={totalNumOfContracts}
            unit={'件'}
          />
        </TableCell>
      </TableRow>
    </TotalResultContainer>
  );
};