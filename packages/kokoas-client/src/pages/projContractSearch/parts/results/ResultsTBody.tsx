import { Button, TableBody } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { Link, useNavigate } from 'react-router-dom';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = ({
  items,
}: {
  items: ContractRow[]
}) => {

  const navigate = useNavigate();


  return (
    <TableBody>
      {items?.map(({
        uuid,
        projId,
        projDataId,
        estimateDataId,
        projName,
        contractAmount,
        grossProfit,
        store,
        yumeAG,
        cocoAG,
        custName,
        contractDate,
        latestInvoiceAmount,
        latestInvoiceDate,
        plannedPaymentDate,
        invoiceId,
      })=>{

        const parsedLatestInvoiceAmount = `${latestInvoiceAmount.toLocaleString()} 円`;

        return (
          <TRowLayout
            key={uuid}
            projDataId={(
              <Link to={`${pages.projEdit}?${generateParams({ projId })}`}>
                {projDataId}
              </Link>
              )}
            estNum={(
              <Link to={`${pages.projEdit}?${generateParams({ projEstimateId: uuid })}`}>
                {estimateDataId.slice(-2)}
              </Link>
              )}
            projName={projName}
            store={store}
            yumeAG={yumeAG}
            cocoAG={cocoAG}
            custName={custName}
            contractDate={contractDate}
            contractAmount={`${contractAmount.toLocaleString()}円`}
            grossProfit={`${grossProfit.toLocaleString()}円`}
            latestInvoiceAmount={invoiceId ? (
              <Link to={`${pages.projInvoice}?${generateParams({ invoiceId })}`}>
                {parsedLatestInvoiceAmount}
              </Link>
            ) : parsedLatestInvoiceAmount}
            latestInvoiceDate={latestInvoiceDate || '-'}
            plannedPaymentDate={plannedPaymentDate || '-'}
            menu={(
              <Button
                fullWidth
                onClick={() => navigate(`${pages.projInvoice}?${generateParams({ projEstimateId: uuid })}`)}
              >
                請求入力
              </Button>)}
          />
        );
      })}

    </TableBody>
  );
};