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
  } = useURLParams();

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: recInvoice } = useInvoicesById(projInvoiceIdFromURL || '');
  const custGroupIdFromInvoice = recInvoice?.record.custGroupId.value;

  const { data: custData } = useCustGroupById(custGroupIdFromURL || custGroupIdFromInvoice || '');
  const { data: recContracts } = useContractsByCustGroupId(custGroupIdFromURL || '');
  const { data: recInvoices } = useInvoiceTotalByCustGroupId(custGroupIdFromURL || '');


  useEffect(() => {

    if (projInvoiceIdFromURL && recInvoice && custData) {
      setValues((prev) => ({
        ...prev,
        ...convertCustDataToForm(custData),
        ...convertInvoiceToForm(recInvoice.record),
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData && recContracts) {

      const newEstimates = sortEstimatesByProjId(recContracts);

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = custData.custNames.value;
        newEstimates?.forEach((data, idx) => {
          const tgtBilledAmount = recInvoices?.find(({ dataId }) => dataId === data.dataId)?.billedAmount ?? '0';

          draft.estimates[idx] = {
            estimateIndex: String(idx),
            projId: data.projId,
            projTypeName: data.projTypeName,
            dataId: data.dataId,
            contractAmount: data.contractAmount,
            billedAmount: Number(tgtBilledAmount),
            billingAmount: data.billingAmount,
            amountType: '',
            isForPayment: data.isForPayment,
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
    recInvoices,
    recInvoice,
  ]);

};