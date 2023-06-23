import { Button, DialogActions, DialogContent } from '@mui/material';



import 'reactflow/dist/style.css';
import { WetInkFlow } from '../../WetInkFlow';




export const StepCheckWetInkFlow = ({
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
        <WetInkFlow />
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