import { KintoneRecord, APPIDS } from './../../../api/kintone/config';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';
import { produce } from 'immer';


/**
 * 仮ファイルです、用更新 
 * PR#100マージされたらにグロバルフックフックあり。
 */



const getEstimateById = async (projEstimateId: string) => {
  const result =  await KintoneRecord.getRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
  });

  return result.record as unknown as Estimates.main.SavedData;
};


export const useUpdateEstimateId = () => {
  const { 
    values: {
      estimateId,
    }, 
    setValues,
  } = useFormikContext<TypeOfForm>();

  useEffect(() => {
    if (estimateId) {
      getEstimateById(estimateId)
        .then(({
          projId,
          内訳: { value: estimateTable },
          顧客名 : custName,
          利益率: profitRate,
          税率: tax,
          estimateStatus,
          工事名称: projName,
          工事種別名: projType,
        }) => {

          if (estimateId) {
            setValues(prev => {
              return produce(prev, draft => {
                draft.customerName = custName.value;
                draft.projId = projId.value;
                draft.profitRate = +profitRate.value;
                draft.taxRate = +tax.value;
                draft.status = estimateStatus.value as TypeOfForm['status'];
                draft.projName = projName.value;
                draft.projType = projType.value;
                draft.items = estimateTable.map(({ id, value: {
                  原価,
                  大項目,
                  中項目,
                  部材名,
                  数量,
                  単位,
                  部材利益率,
                  税,
                } }) => {
                  return {
                    key: id,
                    majorItem: 大項目.value,
                    middleItem: 中項目.value,
                    element: 部材名.value,
                    quantity: +数量.value,
                    unit: 単位.value as TypeOfForm['items'][number]['unit'],
                    costPrice: +原価.value,
                    elemProfRate: +部材利益率.value,
                    taxType: 税.value as TypeOfForm['items'][number]['taxType'],
                  };
                });
              });
            });
          }

        });
    }
 

  }, [estimateId, setValues]);
};