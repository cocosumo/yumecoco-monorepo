import { Alert, Button, List, ListItem, Stack, Typography } from '@mui/material';

export const StepConfirmation = ({
  handleNext,
}: {
  handleNext: () => void
}) => {
  return (
    <Stack direction={'column'} spacing={2}>
      <Alert color="warning" severity="warning">
        エンベロープを取り下げ「以下、無効」にすると、受信者はそのエンベロープを表示したり署名したりできなくなります。
      </Alert>

      <Typography variant='body1'>
        署名プロセスが完了していないエンベロープを途中で無効にすることができます。
        文書を無効にすると、受信者は文書を表示または署名できなくなります。
        また、受信者にエンベロープに署名をする意思がない場合や受信者の署名が不要な場合などは、受信者への通知メールの配信を停止するためにエンベロープを無効にすることもできます。
      </Typography>
      <List
        sx={{
          listStyleType: 'disc',
          pl: 2,
          '& .MuiListItem-root': {
            display: 'list-item',
          },
        }}
      >
        <ListItem>
          署名者は、署名を辞退することでエンベロープを無効化（キャンセル）できます。
        </ListItem>
        <ListItem>
          差出人が無効にできるのは、署名プロセスが完了していないエンベロープのみです。
        </ListItem>
        <ListItem>
          エンベロープを無効にすると、受信者はそのエンベロープを表示したり署名したりできなくなります。
        </ListItem>
        <ListItem>
          すでにエンベロープへの署名を完了した受信者には、エンベロープが無効になったことを示すメールが送信されます。差出人は、このメールに無効化理由を添えることができます。
        </ListItem>
      </List>
      
      <Button
        variant="outlined" 
        onClick={handleNext}
      >
        理由の記入へ
      </Button>
    </Stack>
  );
};