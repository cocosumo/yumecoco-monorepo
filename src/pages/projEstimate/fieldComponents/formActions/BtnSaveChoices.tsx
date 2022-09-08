import { Button, Stack } from '@mui/material';


export const BtnSaveChoices = () => {


  return (
    <Stack spacing={2}>
      <Button variant={'contained'}>
        編集画面に戻る
      </Button>
      <Button variant={'contained'}>
        保存して画面を閉じる
      </Button>
    </Stack>
  );
};