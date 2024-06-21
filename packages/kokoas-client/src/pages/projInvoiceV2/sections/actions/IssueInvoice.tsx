import { Button } from '@mui/material';



export const IssueInvoice = () => {

  return (
    <Button
      variant={'outlined'}
      color='info'
      onClick={() => {
        alert('開発中です');
      }}
    >
      請求書発行
    </Button>
  );

};
