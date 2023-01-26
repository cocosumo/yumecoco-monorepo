import { TableBody } from '@mui/material';
import { translations } from 'kokoas-client/src/helpers/translations';
import { formatDataId } from 'libs';
import { useFilteredContracts } from '../../hooks/useFilteredContracts';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = () => {

  const { data } = useFilteredContracts();


  return (
    <TableBody>
      {data?.map(({
        uuid: { value: uuid },
        dataId: { value: dataId },
      })=>{
        const formattedDataId = formatDataId(dataId);
        const estNum = formattedDataId.slice(-2);
        const projDataId = formattedDataId.substring(0, formattedDataId.length - 3);


        return (
          <TRowLayout
            key={uuid}
            projId={projDataId}
            estNum={estNum}
            projName={translations.projName}
            projType={translations.projType}
            store={translations.store}
            yumeAG={translations.yumeAG}
            cocoAG={translations.cocoAG}
            custName={translations.custName}
            contractDate={translations.contractDate}
            contractAmount={translations.contractAmount}
            grossProfit={translations.grossProfit}
          />
        );
      })}

    </TableBody>
  );
};