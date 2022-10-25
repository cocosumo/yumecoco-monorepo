import { Card, CardContent, Stack, Typography } from '@mui/material';

export const EstimateCards = ({
  projId,
}: {
  projId: string
}) => {

  /* 工事情報から契約済みの見積もり情報を取り出す */
  const contracts = [{
    estimateId: '1',
    amount: 'a',
  }, {
    estimateId: '2',
    amount: 'b',
  }, {
    estimateId: '3',
    amount: 'c',
  }]; // ダミーデータ

  /* 取り出した見積もり情報(複数)をカードで表示する */

  return (
    <>
      <Typography variant='caption'>
        契約一覧 ※要編集
      </Typography>
      <Stack direction={'row'} spacing={2}>
        {contracts.map((contract) => {
          return (
            <Card key={projId + contract.estimateId}>
              <CardContent>
                <Typography>
                  {`見積もり情報：${contract.amount}`}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </>
  );
};