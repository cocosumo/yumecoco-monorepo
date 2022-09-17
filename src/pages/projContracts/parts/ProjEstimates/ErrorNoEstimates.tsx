import { Alert, AlertTitle, Button } from '@mui/material';

export const ErrorNoEstimates = () => {
  return (
    <Alert
      severity='info'
      action={
        <Button
          size='large'
          color="inherit"
          variant="outlined"
        >
          見積登録
        </Button>
          }
    >
      <AlertTitle>
        見積は未ありません。
      </AlertTitle>
      契約を作成するのに、見積もりが必要です。右のボタンで新規登録出来ます。
    </Alert>
  );
};