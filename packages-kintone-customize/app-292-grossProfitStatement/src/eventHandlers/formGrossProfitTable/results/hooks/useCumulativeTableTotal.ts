import { SummaryContracts } from '../../../helpers/getSummaryContracts';
import { AreaLabelList, ProjTypeList, areaLabelList } from '../../config';

type CumulativeTableTotal = {
  orderAmtTotalBeforeTax: number, // 受注金額計
  grossprofitAmtTotal: number,    // 粗利
  introFeeYume: number,           // 夢てつ紹介料
};



/** 受け取った契約書のデータを、対象のエリアに絞り込んで表示する */
export const useCumulativeTableTotal = ({
  contractData,
  area,
}: {
  contractData: SummaryContracts[]
  area: string[]
}) => {

  console.log('エリアを選択している?', areaLabelList.includes(area[0] as AreaLabelList), area[0]);

  const filteredContracts = contractData.filter((contract) => {
    const {
      storeName,
      area: territory,
    } = contract;

    if (!areaLabelList.includes(area[0] as AreaLabelList)) {
      // 各店舗が選択されている場合
      return area.includes(storeName);

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

  console.log(`contractData: ${contractData.length}件, ${contractData}`);
  console.log(`filteredContracts: ${filteredContracts.length}件, ${filteredContracts}`);

  const formattingContracts = filteredContracts.reduce((acc, {
    projTypeForTotalization,
    orderAmountBeforeTax,
    grossProfitAmount,
    introFeeYume,
  }) => {

    if (typeof acc[projTypeForTotalization] === undefined) {
      acc[projTypeForTotalization] = {
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

  }, {} as Record<ProjTypeList[number], CumulativeTableTotal>);


  return Object.entries(formattingContracts);

};
