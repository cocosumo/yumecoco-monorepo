import { TableBody } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';
import { FitText } from '../../../../../components/FitText';

export const ByStoreTBody = ({
  records,
  isCompanyProperty = false,
}:{
  records: DB.SavedRecord[],
  isCompanyProperty?: boolean,
}) => {

  return (
    <TableBody>
      {records.map(({
        $id,
        custName,
        projName,
        contractDate,
        contractAmountIntax,
        yumeAGName, 
        yumeAGName2,

        cocosumoAGName,
        storeName,
        
      },
      index) => {

        const yumeAGNames = [yumeAGName.value, yumeAGName2.value].filter(Boolean).join(', ');

        return (
          <ByStoreTRLayout 
            key={$id.value}
            index={index + 1}
            custName={<FitText content={isCompanyProperty ? storeName.value : custName.value} />}
            projName={<FitText content={projName.value} />}
            contractDate={contractDate.value}
            contractAmt={(+contractAmountIntax.value).toLocaleString()}
            agentNames={isCompanyProperty ? cocosumoAGName.value : yumeAGNames}
            recId={$id.value}
          />
        );
      })}

    </TableBody>
  );
};