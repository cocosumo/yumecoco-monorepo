
import 'reactflow/dist/style.css';

import { ElectronicFlow } from '../../ElectronicFlow';
import { Button, DialogActions, DialogContent } from '@mui/material';



export const StepCheckElectronicFlow = ({
  handleSendContract,
  handleCancel,
}: {
  handleSendContract: () => void
  handleCancel: () => void
}) => {

  return (
    <>
      <DialogContent 
        sx={{
          height: 600,
        }}
      >
        <ElectronicFlow />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
        >
          キャンセル
        </Button>

        <Button
          color={'primary'} 
          variant={'contained'}
          onClick={handleSendContract}
        >
          送信
        </Button> 
      </DialogActions>
      
    </>
 

  );
};