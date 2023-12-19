import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { CumulativeTableAverage } from './CumulativeTableAverage';
import { CumulativeTableTotal } from './CumulativeTableTotal';



/**
 * 選択したエリアでの累計の粗利表を表示する
 * @returns 
 */
export const CumulativeTableByArea = ({
  contractData,
}: {
  contractData: SummaryContracts[]
}) => {



  return (
    <>
      <CumulativeTableTotal contractData={contractData} />
      <CumulativeTableAverage />
    </>
  );
};
