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
          width={30}
        >
          未達の理由
        </TableCell>
        <TableCell width={200}>
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
        <TableCell>
          {improvement?.value}
        </TableCell>
      </TableRow>
    </OverallRemarksContainer>
  );
};