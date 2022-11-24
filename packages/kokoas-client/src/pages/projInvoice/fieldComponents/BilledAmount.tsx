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
  isError,
  isFetching,
}: {
  billedAmount: number | undefined
  records: DBInvoices.SavedData[] | undefined
  isError: boolean
  isFetching: boolean
}) => {



  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          請求済金額
        </FormLabel>
        {!isError && !isFetching && !!billedAmount &&
          <>
            <Typography sx={{ width: 120, textAlign: 'right' }}>
              {`${Math.round(billedAmount).toLocaleString()} 円`}
            </Typography>
            <BilledAmountDetails invoices={records} />
          </>}
        {(isError || isFetching || !billedAmount) && <Typography>
          {'なし'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};