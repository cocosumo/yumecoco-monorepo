import { Button, Stack } from '@mui/material';

export const Actions = ({
  systemId,
}:{
  systemId: string,
}) => {
  return (
    <Stack
      spacing={1}
      minWidth={200}
    >
      <Button
        size='small'
        variant='outlined'
      >
        出力
      </Button>
      {systemId && (
      <Button
        size='small'
        variant='outlined'
          // 固定、テスト用
        href={`https://budget.andpad.jp/orders/${systemId}/contract_order_payments/`}
        target={'_blank'}
      >
        Andpadで開く
      </Button>
      )}

    </Stack>

  );
};