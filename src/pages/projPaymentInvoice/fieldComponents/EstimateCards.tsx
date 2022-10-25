import { Card, CardContent, Typography } from '@mui/material';

export const EstimateCards = ({
  projId,
}: {
  projId: string
}) => {

  /* 工事情報から契約済みの見積もり情報を取り出す */
  /* 取り出した見積もり情報(複数)をカードで表示する */

  return (
    <Card>
      <CardContent>
        <Typography>
          {`見積もり情報の表示予定：${projId}`}
        </Typography>
      </CardContent>
    </Card>
  );
};