import { UseTargetDataReturn } from '../../../../hooks/useTargetData';
import { TableRow } from '@mui/material';
import { YearlyTarget } from './YearlyTarget';

export const YearlySummary = ({
  fiscalYear,
  data,
}:{
  fiscalYear: number,
  data: UseTargetDataReturn['data'],
}) => {
  
  return (
    <TableRow>
      <YearlyTarget data={data} />
            
    </TableRow>
  );
}; 