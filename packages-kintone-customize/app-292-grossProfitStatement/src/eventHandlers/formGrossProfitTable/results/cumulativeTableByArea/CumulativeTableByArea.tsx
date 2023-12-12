import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { CumulativeTableAverage } from '../manthlyTableByArea/CumulativeTableAverage';
import { CumulativeTableTotal } from '../manthlyTableByArea/CumulativeTableTotal';



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
      <CumulativeTableTotal />
      <CumulativeTableAverage />
    </>
  );
};
