import { TableBody } from '@mui/material';

import { MonthRow } from './MonthRow';


const fiscalMonths = Array.from({ length: 12 }, (_, i) => (i + 12) % 12 + 1);


export const TBody = () => {


  return (
    <TableBody>
      {fiscalMonths
        .map((month) => {
          return (
            <MonthRow 
              month={month} 
              key={month}
            />
          );
        })}
     

    </TableBody>);
};