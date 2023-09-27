import { TableCell } from '@mui/material';
import { useProspectsNextMonth } from '../../../../hooks/useProspectsNextMonth';
import { useMemo } from 'react';

export const ProspectsNextMonth = () => {
  const { data } = useProspectsNextMonth();

  const result = useMemo(
    () =>{
      return data?.reduce((acc, cur) => {
        return {
          numOfProspectsNextMonth: acc.numOfProspectsNextMonth + 1,
          amtOfProspectsNextMonth: acc.amtOfProspectsNextMonth + (+cur.schedContractPrice.value),
        };
      }, {
        numOfProspectsNextMonth: 0,
        amtOfProspectsNextMonth: 0,
      });
    },
    [data],
  );

  const {
    amtOfProspectsNextMonth = 0,
    numOfProspectsNextMonth = 0,
  } = result || {};

  return (
    <>
      <TableCell>
        {numOfProspectsNextMonth}
        件
      </TableCell>
      <TableCell>
        {amtOfProspectsNextMonth.toLocaleString()}
      </TableCell>
    </>
  );
};