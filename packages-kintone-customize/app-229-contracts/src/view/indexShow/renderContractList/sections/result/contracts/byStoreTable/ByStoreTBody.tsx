import { TableBody } from '@mui/material';
import { ByStoreTRLayout } from './ByStoreTRLayout';

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
            custName={custName.value}
            projName={projName.value}
            contractDate={contractDate.value}
            contractAmt={(+contractAmountIntax.value).toLocaleString()}
            agentNames={[yumeAGName.value, yumeAGName2.value].filter(Boolean).join(', ')}
          />
        );
      })}

    </TableBody>
  );
};