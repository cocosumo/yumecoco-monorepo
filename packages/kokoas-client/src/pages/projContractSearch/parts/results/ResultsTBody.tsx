import { TableBody } from '@mui/material';
import { translations } from 'kokoas-client/src/helpers/translations';
import { useContracts } from 'kokoas-client/src/hooksQuery';
import { formatDataId } from 'libs';
import { TRowLayout } from './TRowLayout';

export const ResultsTBody = () => {

  const { data } = useContracts({ limit: 5 });

  const contracts = data?.records;

  return (
    <TableBody>
      {contracts?.map(({
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