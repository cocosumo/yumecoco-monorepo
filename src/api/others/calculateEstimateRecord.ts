import { calculateEstimate } from './calculateEstimate';


export const calculateEstimateRecord = async (estimateRecord: Estimates.main.SavedData) => {
  const {
    内訳 : { value : estimateTable },
    税率: { value: tax },
  } = estimateRecord;


  return calculateEstimate({
    tax: +tax,
    materials: estimateTable.map(({ value: {
      原価: { value: costPrice },
      数量 : { value: quantity },
      税 : { value: taxType },
      部材利益率: { value: materialProfit },
    } }) => {
      return {
        costPrice: +costPrice,
        quantity: +quantity,
        isTaxable: taxType === '課税',
        materialProfit: +materialProfit,
      };
    }),
  });


};