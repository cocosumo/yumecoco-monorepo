import { Stack, Typography } from '@mui/material';

export const TooltipTitle = ({
  alive,
  runtime,
  isFetchedAfterMount,
}:{
  alive: boolean;
  runtime: number;
  isFetchedAfterMount: boolean;
}) => {

  let status = '';
  if (isFetchedAfterMount) {
    if (alive) {
      status = '正常';
    }
  } else {
    status = '接続中';
  }

  if (isFetchedAfterMount && !alive) {
    return (
      <Typography>
        処理サーバーに接続出来なかったため、一部機能が制限されています。
        <br />
        お手数ですが、管理者にお知らせください。
      </Typography>
    );
  }

  return (
    <Stack>
      <Typography fontWeight={'bold'} fontSize={14}>
        サーバー状態
      </Typography>
      <div>
        {`ステータス：${status}`}
      </div>
      <div>
        {`応答時間：${ alive ? `${Math.round(runtime)}ms` : '-' }`}
      </div>
    </Stack>
  );
};
