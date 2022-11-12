import { useEstimateById } from './../../../hooksQuery/useEstimateById';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';
import { produce } from 'immer';
import { format, parseISO } from 'date-fns';


export const useUpdateEstimateId = () => {
  const {
    values: {
      estimateId,
    },
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data } = useEstimateById(estimateId);

  useEffect(() => {
    if (data && estimateId) {

      const { record } = data;
      const {
        projId,
        内訳: { value: estimateTable },
        顧客名 : custName,
        工事種別利益: projTypeProfit,
        税: tax,
        estimateStatus,
        工事名称: projName,
        projTypeId,
        工事種別名: projTypeName,
        作成日時,
        envStatus,
      } = record;


      setValues(prev => {
        return produce(prev, draft => {
          draft.customerName = custName.value;
          draft.projId = projId.value;
          draft.projTypeProfit = +projTypeProfit.value;
          draft.projTypeId = projTypeId.value;
          draft.tax = +tax.value;
          draft.status = estimateStatus.value as TypeOfForm['status'];
          draft.projName = projName.value;
          draft.projTypeName = projTypeName.value;
          draft.createdDate = format(parseISO(作成日時.value), 'yyyy/MM/dd');
          draft.envStatus = envStatus.value;
          draft.items = estimateTable.map(({ id, value: {
            原価,
            大項目,
            中項目,
            部材名,
            数量,
            単位,
            部材利益率,
            taxType,
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
              taxType: taxType.value as TypeOfForm['items'][number]['taxType'],
            };
          });
        });
      });
      
      
    }

  }, [data, estimateId, setValues]);

};