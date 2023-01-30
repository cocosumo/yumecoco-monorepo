import { TableBody } from '@mui/material';
import { ContractRow } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = ({
  data,
}: {
  data: ContractRow[]
}) => {


  return (
    <TableBody>
      {data?.map(({
        uuid,
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
            projId={projDataId}
            estNum={estDataId}
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