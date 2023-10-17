import { TableBody } from '@mui/material';

import { MonthRow } from './MonthRow';
import { useTargetData } from '../../../hooks/useTargetData';


const fiscalMonths = Array.from({ length: 12 }, (_, i) => (i + 12) % 12 + 1);


export const TBody = () => {
  const { data } = useTargetData();


  return (
    <TableBody>
      {fiscalMonths
        .map((month) => {
          return (
            <MonthRow 
              data={data}
              month={month} 
              key={month}
            />
          );
        })}
     

    </TableBody>);
};