import { FormControl, FormLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { BilledAmountDetails } from './BilledAmountDetails';

/**
 * 請求済み金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BilledAmount = ({
  billedAmount,
  records,
}: {
  billedAmount: number | undefined
  records: DBInvoices.SavedData[] | undefined
}) => {


  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          請求済金額
        </FormLabel>
        {!!billedAmount &&
          <>
            <Typography sx={{ width: 120, textAlign: 'right' }}>
              {`${Math.round(billedAmount).toLocaleString()} 円`}
            </Typography>
            <BilledAmountDetails invoices={records} />
          </>}
        {!billedAmount && <Typography>
          {'なし'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};