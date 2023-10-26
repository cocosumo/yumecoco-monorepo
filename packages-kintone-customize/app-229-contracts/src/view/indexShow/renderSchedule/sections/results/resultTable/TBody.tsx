import { LinearProgress, TableBody, TableCell, TableRow } from '@mui/material';

import { MonthRow } from './monthRow/MonthRow';
import { useTargetData } from '../../../hooks/useTargetData';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';
import { YearlySummary } from './yearlySummary/YearlySummary';


const fiscalMonths = Array.from({ length: 12 }, (_, index) => (index + 11) % 12 + 1);

export const TBody = () => {
  const { data, isLoading } = useTargetData();
  const fiscalYear = useTypedWatch({
    name: 'fiscalYear',
  }) as TForm['fiscalYear'];


  if (isLoading) return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={100}>
          <LinearProgress />
        </TableCell>
      </TableRow>
    </TableBody>
  );

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