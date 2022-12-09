import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useConfirmDialog } from 'kokoas-client/src/hooks';

/**
 * 請求済み金額の詳細を表示するコンポーネント
 * @param invoices :工事番号に紐づいた請求管理DBのデータ
 * @returns 
 */
export const BilledAmountDetails = ({
  invoices,
}: {
  invoices: DBInvoices.SavedData[] | undefined
}) => {

  const { setDialogState } = useConfirmDialog();


  return (
    <Button onClick={() => {
      setDialogState({
        open: true,
        title: '請求済一覧',
        withYes: true,
        yesText: '閉じる',
        withNo: false,
        content: invoices?.map(({ plannedPaymentDate, billingAmount, $id }) => {
          return (
            <Stack
              direction={'row'}
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
              key={`billedAmount_${$id.value}`}
            >
              <Typography variant='caption' sx={{ width: '60px' }}>
                支払予定日
              </Typography>
              <Typography sx={{ width: '80px' }}>
                {plannedPaymentDate.value}
              </Typography>

              <Typography variant='caption' sx={{ width: '60px' }}>
                請求金額
              </Typography>
              <Typography>
                {billingAmount.value}
              </Typography>
            </Stack>
          );
        }),
      });
    }}
    >
      詳細
    </Button >
  );
};