import { Alert } from '@mui/material';

export const NoResult = () => {
  return (
    <Alert
       severity="warning"
    >
      条件にあう見込み顧客がありません。条件を変更して再度検索してください。
    </Alert>
  );
};