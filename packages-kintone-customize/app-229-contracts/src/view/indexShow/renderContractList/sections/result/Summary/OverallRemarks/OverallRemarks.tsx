import { TableCell, TableRow } from '@mui/material';
import { OverallRemarksContainer } from './OverallRemarksContainer';

export const OverallRemarks = () => {
  
  return (
    <OverallRemarksContainer>
      <TableRow>
        <TableCell 
          variant='head'
          component={'th'}
        >
          未達の理由
        </TableCell>
        <TableCell width={200}>
          全体的に新築の案件が少ないので今までよりも一件の重みを感じて一件一件慎重に進めていきます。
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
          新築で数字を作るしかないので、何とか今の案件を契約まで持って行きます。
        </TableCell>
      </TableRow>
    </OverallRemarksContainer>
  );
};