import { TableCell, TableRow } from '@mui/material';
import { OverallRemarksContainer } from './OverallRemarksContainer';
import { useOverallRemarks } from '../../../../hooks/useOverallRemarks';

export const OverallRemarks = () => {

  const { data } = useOverallRemarks();

  const {
    unachieved,
    improvement,
  } = data || {};
  
  return (
    <OverallRemarksContainer>
      <TableRow>
        <TableCell 
          variant='head'
          component={'th'}
          width={35}
        >
          未達の理由
        </TableCell>
        <TableCell 
          width={200} 
          sx={{
            whiteSpace: 'normal',
          }}
        >
          {unachieved?.value}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell 
          variant='head'
          component={'th'}
        >
          次月の改善
        </TableCell>
        <TableCell 
          sx={{
            whiteSpace: 'normal',
          }}
        >
          {improvement?.value}
        </TableCell>
      </TableRow>
    </OverallRemarksContainer>
  );
};