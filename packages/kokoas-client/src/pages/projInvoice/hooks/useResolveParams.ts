import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractsByCustGroupId, useCustGroupById, useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
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

  const { data: custData } = useCustGroupById(custGroupIdFromURL || '');
  const { data: contracts } = useContractsByCustGroupId(custGroupIdFromURL || '');
  const { data: invoices } = useInvoiceTotalByCustGroupId(custGroupIdFromURL || '');



  useEffect(() => {

    if (projInvoiceIdFromURL) {
      setValues((prev) => ({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData && contracts) {

      const newEstimates = sortEstimatesByProjId(contracts);

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = custData.custNames.value;
        newEstimates?.forEach((data, idx) => {
          const tgtBilledAmount = invoices?.find(({ dataId }) => dataId === data.dataId)?.billedAmount ?? '0';

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
            isForPayment: data.isForPayment,
            estimateId: data.estimateId,
          };
        });
      });

      setValues(newValues);

    } else {
      setValues(initialValues);
    }

  }, [custGroupIdFromURL, projInvoiceIdFromURL, setValues, custData, contracts, invoices]);

};