import { calculateEstimateRecord } from 'api-kintone';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useCustGroups, useEstimates, useProjects } from 'kokoas-client/src/hooksQuery';
import { formatDataId } from 'libs';
import { TEnvelopeStatus } from 'types';
import { TypeOfForm } from '../form';

export interface ContractRow {
  uuid: string,
  projId: string,
  projDataId: string,
  estDataId: string,
  projName: string,
  storeName: string,
  yumeAG: string,
  cocoAG: string,
  custName: string,
  contractDate: string,
  totalAmountAfterTax: number,
  totalProfit: number,
}


/**
 *
 *  フィルター条件から、契約データを取得
 *
 * 他のところで必要になったら、改修しhooksQueryに移動
 * */
export const useFilteredContracts = () => {
/* URLのParamsを監視し、フィルター条件を再設定する。 */

  const {
    mainSearch,
  } = useURLParams<TypeOfForm>();



  const { data: projData } = useProjects();
  const { data: custGroupData } = useCustGroups();

  return useEstimates({
    enabled: !!projData && !!custGroupData,
    select: (d) => {

      if (!projData || !custGroupData) return;

      let minAmount = 0;
      let maxAmount = 0;

      // Combine data
      const items = d.reduce((acc, cur) => {

        /* 見積情報 */
        const {
          projId,
          uuid,
          dataId,
          envStatus,
          contractDate,
        } = cur;

        /* 契約済みじゃないなら、次のレコードへ行く */
        if ((envStatus.value as TEnvelopeStatus) !== 'completed') return acc;


        /* 工事情報 */
        const {
          projName,
          custGroupId,
        } = projData.find((projRec) => projRec.uuid.value === projId.value ) || {};

        const {
          custNames,
          cocoAGNames,
          yumeAGNames,
          storeName,
        } = custGroupData.find((custGroupRec) => custGroupRec.uuid.value === custGroupId?.value ) || {};


        const formattedDataId = formatDataId(dataId.value);
        const estNum = formattedDataId.slice(-2);
        const projDataId = formattedDataId.substring(0, formattedDataId.length - 3);

        /* 契約金額と粗利 */
        const {
          summary : {
            totalProfit,
            totalAmountAfterTax,
          },
        } = calculateEstimateRecord({ record: cur });

        /* minとmaxを設定 */
        if (totalAmountAfterTax < minAmount) {
          minAmount = totalAmountAfterTax;
        }

        if (totalAmountAfterTax > maxAmount) {
          maxAmount = totalAmountAfterTax;
        }

        const resultRow = {
          uuid: uuid.value,
          projId: projId.value,
          projDataId,
          estDataId: estNum,
          cocoAG: cocoAGNames?.value || '',
          yumeAG: yumeAGNames?.value || '',
          contractDate: contractDate.value  || '',
          custName: custNames?.value || '',
          projName: projName?.value || '',
          storeName: storeName?.value || '',
          totalAmountAfterTax,
          totalProfit,
        };

        /* 絞り込み */
        if (mainSearch) {
          const hitMainSearch = Object
            .values(resultRow)
            .some((val) =>{
              return val.toString().includes(mainSearch);
            });
          if (hitMainSearch) {
            acc.push(resultRow);
          }
        } else {
          acc.push(resultRow);
        }


        return acc;
      },
      [] as ContractRow[],
      );


      // 結果

      return {
        items,
        minAmount,
        maxAmount,
      };
    },
  });

};