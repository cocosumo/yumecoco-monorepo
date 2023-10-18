import { TableBody } from '@mui/material';

import { MonthRow } from './monthRow/MonthRow';
import { useTargetData } from '../../../hooks/useTargetData';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';
import { YearlySummary } from './yearlySummary/YearlySummary';


const fiscalMonths = Array.from({ length: 12 }, (_, index) => (index + 11) % 12 + 1);

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

      <YearlySummary
        data={data}
        fiscalYear={fiscalYear}
      />
      
    </TableBody>);
};