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

      const newEstimates = sortEstimatesByProjId(recContracts);

      setNewFormVal((prev) => ({
        ...prev,
        ...convertCustDataToForm(custData),
        ...convertInvoiceToForm(recInvoice.record, newEstimates, datInvoicesSummary, estimateIdFromURL?.split(',') ?? []),
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData && recContracts) {

      /* このタイミングでのestimatesの保存をやめる */
      const newEstimates = sortEstimatesByProjId(recContracts);

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = custData.custNames.value;
        newEstimates?.forEach((data, idx) => {
          const targetInvoice = datInvoicesSummary?.find(invoice => invoice.dataId === data.dataId);
          const {
            billedAmount = 0,
            createdAmount = 0,
          } = targetInvoice || {};
          const newIsForPayment = (estimateIdFromURL || '').split(',').includes(data.estimateId);

          draft.estimates[idx] = {
            estimateIndex: String(idx),
            projId: data.projId,
            projTypeName: data.projTypeName,
            dataId: data.dataId,
            contractAmount: data.contractAmount,
            nonTaxableAmount: data.nonTaxableAmount,
            billedAmount: billedAmount,
            createdAmount: createdAmount,
            billingAmount: data.billingAmount,
            amountType: '',
            isForPayment: data.isForPayment || newIsForPayment,
            estimateId: data.estimateId,
          };
        });
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