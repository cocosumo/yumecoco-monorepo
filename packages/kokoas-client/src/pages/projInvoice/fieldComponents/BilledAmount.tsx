import { FormControl, FormLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useInvoiceTotalByProjId } from 'kokoas-client/src/hooksQuery';
import { BilledAmountDetails } from './BilledAmountDetails';


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
        <FormLabel>
          請求済金額 &emsp;&emsp;
        </FormLabel>
        {!error && !isFetching && !!totalInvoice &&
          <>
            <Typography>
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