import { Alert, AlertTitle, Grid } from '@mui/material';

export const UneditableInfo = () => {
  return (
    <Grid item xs={12} >
      <Alert severity="warning">
        <AlertTitle>修正出来ません</AlertTitle>
        契約書は「送信済み」状態なので、修正が出来ません。
        <br/>
        契約を「無効」ににすれば、修正出来ます。
        <br/>
        契約は「完了」状態になったら、「無効化」出来ないので、注意してください。
      </Alert>
    </Grid>
  );
};