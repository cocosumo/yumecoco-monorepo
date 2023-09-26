import { TableBody } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';
import { FitText } from '../../../../../components/FitText';

export const ByStoreTBody = ({
  records,
}:{
  records: DB.SavedRecord[]
}) => {

  return (
    <TableBody>
      {records.map(({
        $id,
        custName,
        projName,
        contractDate,
        contractAmountIntax,
        yumeAGName, yumeAGName2,
      },
      index) => {

        return (
          <ByStoreTRLayout 
            key={$id.value}
            index={index + 1}
            custName={<FitText content={custName.value} />}
            projName={<FitText content={projName.value} />}
            contractDate={contractDate.value}
            contractAmt={(+contractAmountIntax.value).toLocaleString()}
            agentNames={[yumeAGName.value, yumeAGName2.value].filter(Boolean).join(', ')}
            recId={$id.value}
          />
        );
      })}

    </TableBody>
  );
};