import { TableBody } from '@mui/material';
import { translations } from 'kokoas-client/src/helpers/translations';
import { useFilteredContracts } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = () => {

  const { data } = useFilteredContracts();

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