import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractsByEstId, useCustGroupById, useEstimateById, useProjById, useProjTypeById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertEstimateToForm, convertProjToForm, convertProjTypeToForm } from '../api';
import { initialValues } from '../form';
import { TForm } from '../schema';

export const useResolveParam = () => {
  const [newFormVal, setNewFormVal] = useState<TForm>(initialValues);
  const {
    projId: projIdFromURL,
    projEstimateId: projEstimateIdFromURL,
    clearFields,
  } = useURLParams();


  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');

  const {
    record: recProjEstimate,
  } = dataProjEstimate || {};

  const { data: recProj } = useProjById(recProjEstimate?.projId.value || projIdFromURL || '');
  const { data: recProjType } = useProjTypeById(recProj?.projTypeId?.value || '');
  const { data: recContract } = useContractsByEstId(projEstimateIdFromURL || '');
  const { data: recCustGroupRec } = useCustGroupById(recProj?.custGroupId?.value || '');

  

  useEffect(() => {

    if (projEstimateIdFromURL && recProjType && recProj && recProjEstimate && recContract && recCustGroupRec) {
      const {
        envelopeStatus,
        uuid: contractId,
      } = recContract?.[0] || {};

      const {
        members,
      } = recCustGroupRec;

      const custNames = members.value.map(({ value }) => value.customerName.value).join('、');

      setNewFormVal((prev) => ({
        ...prev,
        hasOnProcessContract: !!envelopeStatus?.value,
        envStatus: envelopeStatus?.value || '',
        contractId: contractId?.value || '',
        customerName: custNames,
        ...convertEstimateToForm(recProjEstimate),
        ...convertProjToForm(recProj),
        ...convertProjTypeToForm(recProjType),
      }));
    } else if (projIdFromURL && recProjType && recProj) {
      /* 新規 */
      /* Initialize profit rate when only projId is provided */
      const profRate = +recProjType.profitRate.value;
      setNewFormVal((prev) => ({
        ...prev,
        ...convertProjToForm(recProj),
        ...convertProjTypeToForm(recProjType),
        projTypeProfit: profRate,
      }));
      

    } else if (clearFields) {
      // 内訳をコピーする場合、

      if (clearFields === 'estimateId') {
        // 見積もり番号を削除し、工事番号を残す
        setNewFormVal((prev) => ({
          ...prev,
          estimateId: '',
          envStatus: '',
        }));
      } else {
        // 内訳のみをコピーする
        setNewFormVal((prev) => ({
          ...initialValues,
          items: [...prev.items],
        }));
      }
    }  else {
      setNewFormVal(initialValues);
    }

  }, [ 
    recCustGroupRec,
    projIdFromURL, 
    projEstimateIdFromURL, 
    recProjType, 
    recProj, 
    recProjEstimate, 
    clearFields, 
    recContract,
  ]);

  return {
    initialForm: newFormVal,
    projIdFromURL,
    projEstimateIdFromURL,
  };
};