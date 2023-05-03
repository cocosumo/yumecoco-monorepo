import { Alert, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

export const StepReason = ({
  handleCloseDialog,
  handleNext,
}: {
  handleCloseDialog: () => void
  handleNext: () => void
}) => {
  const [value, setValue] = useState('');


  return (
    <Stack spacing={2}>

      <Alert color="warning" severity="warning">
        すでにエンベロープへの署名を完了した受信者には、エンベロープが無効になったことを示すメールが送信されます。
      </Alert>
      <TextField label="理由" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='理由を入力してください。'
        multiline
        rows={4}
      />

      <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
        <Button onClick={handleCloseDialog}>
          キャンセル
        </Button>
        <Button
          color='error'
          variant='contained'
          onClick={handleNext}
        >
          無効にする
        </Button>
      </Stack>
    </Stack>
  );
};