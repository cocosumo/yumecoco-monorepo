import { Button, Stack } from '@mui/material';



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
      <WetInkFlow />
      <Stack 
        direction={'row'}
        spacing={2} 
        justifyContent={'flex-end'}
        mt={2}
      >
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
      </Stack>
    
    </>
   
  );
};