import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractsByCustGroupId, useCustGroupById, useInvoicesById, useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
import { convertCustDataToForm } from '../api/convertCustDataToForm';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { initialValues, TypeOfForm } from '../form';
import { sortEstimatesByProjId } from '../helper/sortEstimatesByProjId';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const {
    invoiceId: projInvoiceIdFromURL,
    custGroupId: custGroupIdFromURL,
    projEstimateId: estimateIdFromURL,
  } = useURLParams();

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: recInvoice } = useInvoicesById(projInvoiceIdFromURL || '');
  const newCustGroupId = custGroupIdFromURL || recInvoice?.record.custGroupId.value;

  const { data: custData } = useCustGroupById(newCustGroupId || '');
  const { data: recContracts } = useContractsByCustGroupId(newCustGroupId || '');
  const { data: datInvoicesTotal } = useInvoiceTotalByCustGroupId(newCustGroupId || '');



  useEffect(() => {

    if (projInvoiceIdFromURL && recInvoice && custData && recContracts && datInvoicesTotal) {

      const newEstimates = sortEstimatesByProjId(recContracts);
      setValues((prev) => ({
        ...prev,
        ...convertCustDataToForm(custData),
        ...convertInvoiceToForm(recInvoice.record, newEstimates, datInvoicesTotal, estimateIdFromURL?.split(',') ?? []),
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData && recContracts) {

      const newEstimates = sortEstimatesByProjId(recContracts);

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = custData.custNames.value;
        newEstimates?.forEach((data, idx) => {
          const tgtBilledAmount = datInvoicesTotal?.find(({ dataId }) => dataId === data.dataId)?.billedAmount ?? '0';
          const newIsForPayment = estimateIdFromURL?.split(',').some((item) => item === data.estimateId) ?? false;


          draft.estimates[idx] = {
            estimateIndex: String(idx),
            projId: data.projId,
            projTypeName: data.projTypeName,
            dataId: data.dataId,
            contractAmount: data.contractAmount,
            nonTaxableAmount: data.nonTaxableAmount,
            billedAmount: Number(tgtBilledAmount),
            billingAmount: data.billingAmount,
            amountType: '',
            isForPayment: data.isForPayment || newIsForPayment,
            estimateId: data.estimateId,
          };
        });
      });

      setValues(newValues);

    } else {
      setValues(initialValues);
    }

  }, [
    custGroupIdFromURL,
    projInvoiceIdFromURL,
    setValues,
    custData,
    recContracts,
    datInvoicesTotal,
    recInvoice,
    estimateIdFromURL,
  ]);

};