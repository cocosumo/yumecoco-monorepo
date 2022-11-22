import { FormControl, FormLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useInvoiceTotalByProjId } from 'kokoas-client/src/hooksQuery';
import { BilledAmountDetails } from './BilledAmountDetails';

/**
 * 請求済み金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BilledAmount = ({
  projId = '',
}: {
  projId: string
}) => {

  const {
    data: Invoices,
    error,
    isFetching,
  } = useInvoiceTotalByProjId(projId);

  const { records, totalInvoice } = Invoices || {};


  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          請求済金額
        </FormLabel>
        {!error && !isFetching && !!totalInvoice &&
          <>
            <Typography sx={{ width: 120, textAlign: 'right' }}>
              {`${Math.round(totalInvoice).toLocaleString()} 円`}
            </Typography>
            <BilledAmountDetails invoices={records} />
          </>}
        {(error || isFetching || !totalInvoice) && <Typography>
          {'なし'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};