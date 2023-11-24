import { produce } from 'immer';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractsByCustGroupId, useCustGroupById, useInvoicesById, useInvoicesSummaryByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertCustDataToForm } from '../api/convertCustDataToForm';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { initialValues, TypeOfForm } from '../form';
import { sortEstimatesByProjId } from '../helper/sortEstimatesByProjId';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {

  const [newFormVal, setNewFormVal] = useState<TypeOfForm>(initialValues);

  const {
    invoiceId: projInvoiceIdFromURL,
    custGroupId: custGroupIdFromURL,
    projEstimateId: estimateIdFromURL,
  } = useURLParams();

  const { data: recInvoice } = useInvoicesById(projInvoiceIdFromURL || '');
  const newCustGroupId = custGroupIdFromURL || recInvoice?.record.custGroupId.value;

  const { data: custData } = useCustGroupById(newCustGroupId || '');
  const { data: recContracts } = useContractsByCustGroupId(newCustGroupId || '');
  const { data: datInvoicesSummary } = useInvoicesSummaryByCustGroupId(newCustGroupId || '');



  useEffect(() => {

    if (projInvoiceIdFromURL && recInvoice && custData && recContracts && datInvoicesSummary) {
      // URLに請求書番号が存在する場合、請求書の入力内容を復帰させる

      const newEstimates = sortEstimatesByProjId(recContracts);

      setNewFormVal((prev) => ({
        ...prev,
        ...convertCustDataToForm(custData),
        ...convertInvoiceToForm(recInvoice.record, newEstimates, datInvoicesSummary),
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData) {
      // URLに請求書番号が存在しない場合、請求書の内容は保存しない

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = '-'; // custData.custNames .value; custnamesは廃止されます
      });

      setNewFormVal(newValues);

    } else {
      setNewFormVal(initialValues);
    }

  }, [
    custGroupIdFromURL,
    projInvoiceIdFromURL,
    setNewFormVal,
    custData,
    recContracts,
    datInvoicesSummary,
    recInvoice,
    estimateIdFromURL,
  ]);


  return newFormVal;
};