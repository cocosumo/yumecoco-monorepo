import { Button, Stack } from '@mui/material';


export const BtnSaveChoices = ({ handleClose }: { handleClose: () => void }) => {


  return (
    <Stack spacing={2}>
      <Button variant={'outlined'}
        onClick={()=>{
          self?.window?.close();
        }}
      >
        保存して画面を閉じる
      </Button>
      <Button variant={'contained'}
        onClick={handleClose}
      >
        編集画面に戻る
      </Button>
    </Stack>
  );
};