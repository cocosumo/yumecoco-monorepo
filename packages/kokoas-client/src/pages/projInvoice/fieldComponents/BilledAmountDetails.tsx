import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ConfirmDialogV2 } from 'kokoas-client/src/components/ui/dialogs/ConfirmDialogV2';
import { useState } from 'react';

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

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        詳細
      </Button>
      <ConfirmDialogV2
        open={open}
        title={'請求済一覧'}
        handleYes={handleClose}
        withYes={true}
        yesText={'閉じる'}
        withNo={false}
        content={invoices?.map(({ plannedPaymentDate, billingAmount, $id, projId }) => {
          return (
            <Stack
              direction={'row'}
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
              key={`billedAmount_${projId.value}_${$id.value}`}
            >
              <Typography variant='caption'>
                支払予定日
              </Typography>
              <Typography>
                {plannedPaymentDate.value}
              </Typography>

              <Typography variant='caption'>
                請求金額
              </Typography>
              <Typography>
                {billingAmount.value}
              </Typography>
            </Stack>
          );
        })}
      />
    </>
  );
};