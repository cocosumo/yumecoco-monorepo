import { Button, TableBody } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { pages } from 'kokoas-client/src/pages/Router';
import { useNavigate } from 'react-router-dom';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = ({
  data,
}: {
  data: ContractRow[]
}) => {

  const navigate = useNavigate();


  return (
    <TableBody>
      {data?.map(({
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
          />
        );
      })}

    </TableBody>
  );
};