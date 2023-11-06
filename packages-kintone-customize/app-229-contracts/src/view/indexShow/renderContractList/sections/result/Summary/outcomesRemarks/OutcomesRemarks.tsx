import { TableCell, TableRow } from '@mui/material';
import { OutcomesRemarksContainer } from './OutcomesRemarksContainer';
import { grey } from '@mui/material/colors';
import { OutcomesByArea } from './OutcomesByArea';
import { useOverallRemarks } from '../../../../hooks/useOverallRemarks';

export const OutcomesRemarks = () => {

  
  const { data } = useOverallRemarks();

  const {
    eastSuccess,
    eastFailed,
    
    westSuccess,
    westFailed,
  } = data || {};
  
  return (
    <OutcomesRemarksContainer>
      <TableRow>
        <TableCell 
          colSpan={3}
          sx={{
            bgcolor: grey[200],
            color: grey[700],
            fontWeight: 'bold',
            borderBottom: '4px double',
            borderColor: grey[300],
            width: 300,

          }}
        >
          成功&失敗事例
        </TableCell>
      </TableRow>

      <OutcomesByArea 
        area='西エリア'
        success={westSuccess?.value || '-'}
        failure={westFailed?.value || '-'}   
      />

      <OutcomesByArea 
        area='東エリア'
        success={eastSuccess?.value || '-'}
        failure={eastFailed?.value || '-'}   
      />

      
      
    </OutcomesRemarksContainer>
  );
};