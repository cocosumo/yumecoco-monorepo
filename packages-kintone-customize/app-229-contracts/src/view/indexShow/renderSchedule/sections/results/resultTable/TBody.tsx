import { TableBody } from '@mui/material';

import { MonthRow } from './MonthRow';
import { useTargetData } from '../../../hooks/useTargetData';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';


const fiscalMonths = Array.from({ length: 12 }, (_, i) => (i + 12) % 12 + 1);

export const TBody = () => {
  const { data } = useTargetData();
  const fiscalYear = useTypedWatch({
    name: 'fiscalYear',
  }) as TForm['fiscalYear'];

  console.log('data', data);


  return (
    <TableBody>
      {fiscalMonths
        .map((month) => {
          return (
            <MonthRow 
              data={data}
              month={month} 
              key={month}
              fiscalYear={fiscalYear}
            />
          );
        })}
     

    </TableBody>);
};