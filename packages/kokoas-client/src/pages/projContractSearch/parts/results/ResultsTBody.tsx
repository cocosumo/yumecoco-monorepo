import { Button, TableBody } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { useNavigate } from 'react-router-dom';
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
        estDataId,
        projName,
        totalAmountAfterTax,
        totalProfit,
        storeName,
        yumeAG,
        cocoAG,
        custName,
        contractDate,
        latestInvoiceAmount,
        latestInvoiceDate,
        plannedPaymentDate,
      })=>{

        return (
          <TRowLayout
            key={uuid}
            projId={(
              <Button
                fullWidth
                onClick={() => navigate(`${pages.projEdit}?${generateParams({ projId })}`)}
              >
                {projDataId}
              </Button>
              )}
            estNum={(
              <Button
                fullWidth
                onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projEstimateId: uuid })}`)}
              >
                {estDataId}
              </Button>
              )}
            projName={projName}
            store={storeName}
            yumeAG={yumeAG}
            cocoAG={cocoAG}
            custName={custName}
            contractDate={contractDate}
            contractAmount={`${totalAmountAfterTax.toLocaleString()}円`}
            grossProfit={`${totalProfit.toLocaleString()}円`}
            latestInvoiceAmount={`${latestInvoiceAmount.toLocaleString()} 円`}
            latestInvoiceDate={latestInvoiceDate}
            plannedPaymentDate={plannedPaymentDate}
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