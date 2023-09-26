import { TableCell, TableRow } from '@mui/material';
import { OutcomesRemarksContainer } from './OutcomesRemarksContainer';
import { grey } from '@mui/material/colors';
import { OutcomesByArea } from './OutcomesByArea';

export const OutcomesRemarks = () => {
  
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

          }}
        >
          成功&失敗事例
        </TableCell>
      </TableRow>

      <OutcomesByArea 
        area='西エリア'
        success='少ない打合せ回数で新築受注となり効率的な動きが出来ました。'
        failure='月初から新築契約もありながらも、目標契約金額に少し届いていない。'    
      />

      <OutcomesByArea 
        area='東エリア'
        success='少ない打合せ回数で新築受注となり効率的な動きが出来ました。'
        failure='紹介数が少ない時に、待ちの状態から脱却できないので、夢てつからの紹介を増やしてもらうような案を考えていきます。'    
      />

      
      
    </OutcomesRemarksContainer>
  );
};