import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { useStores } from '../../../hooks/useStores';
import { AreaLabelList, GrossProfitTableRows, ProjTypeList, areaLabelList, projTypeList } from '../../config';



/** 受け取った契約書のデータを、対象のエリアに絞り込んで表示する */
export const useCumulativeTableTotal = ({
  contractData,
  area,
}: {
  contractData: SummaryContracts[]
  area: string[]
}) => {

  const { data: stores } = useStores();

  const filteredContracts = contractData.filter((contract) => {
    const {
      storeName,
      area: territory,
    } = contract;

    if (!areaLabelList.includes(area[0] as AreaLabelList)) {
      // 各店舗が選択されている場合
      const storeNames = area.map((data) => {
        const storeDat = stores?.find(({ uuid }) => uuid.value === data);
        if (storeDat) {
          return storeDat.店舗名.value;
        } else {
          return data;
        }
      });

      return storeNames?.includes(storeName);

    } else {
      // エリアが選択されている場合
      switch (area[0] as AreaLabelList) {
        case '全店舗':
          return contract;
        case '西エリア':
          return territory === '西';
        case '東エリア':
          return territory === '東';
      }
    }
  });

  //console.log(`contractData: ${contractData.length}件, ${contractData}`);
  //console.log(`filteredContracts: ${filteredContracts.length}件, ${filteredContracts}`);

  const formattingContracts = filteredContracts.reduce((acc, {
    projTypeForTotalization,
    orderAmountBeforeTax,
    grossProfitAmount,
    introFeeYume,
  }) => {

    if (typeof acc[projTypeForTotalization] === undefined) {
      acc[projTypeForTotalization] = {
        ...acc[projTypeForTotalization],
        orderAmtTotalBeforeTax: +orderAmountBeforeTax,
        grossprofitAmtTotal: +grossProfitAmount,
        introFeeYume: +introFeeYume,
      };
    } else {
      acc[projTypeForTotalization] = {
        ...acc[projTypeForTotalization],
        orderAmtTotalBeforeTax: +orderAmountBeforeTax,
        grossprofitAmtTotal: +grossProfitAmount,
        introFeeYume: +introFeeYume,
      };
    }
    return acc;

  }, {} as Record<ProjTypeList[number], GrossProfitTableRows>);

  for (const projType of projTypeList) {
    if (typeof formattingContracts[projType] === undefined) {
      formattingContracts[projType] = {
        ...formattingContracts[projType],
      };
    } else {

      const grossProfitCoco = 0;

      formattingContracts[projType] = {
        ...formattingContracts[projType],
        grossProfitCoco: grossProfitCoco,
        grossProfitRateCoco: 0,
        orderAmtMonthlyAve: 0,
        grossProfitMonthlyAve: 0,
      };
    }
  }


  return Object.entries(formattingContracts);

};
