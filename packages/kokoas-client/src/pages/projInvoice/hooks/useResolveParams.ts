import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useContractsByProjId, useInvoiceTotalByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { initialValues, TypeOfForm } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const projIdFromURL = getParam('projId');
  const projInvoiceIdFromURL = getParam('invoiceId');

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: projData } = useProjById(projIdFromURL || '');
  const { data: contracts } = useContractsByProjId(projIdFromURL || '');
  const { data } = useInvoiceTotalByProjId(projIdFromURL || '');
  const { totalInvoice } = data || {};


  useEffect(() => {
    // If projEstimateId got passed, no need to save projId.
    if (projInvoiceIdFromURL) {
      setValues((prev) => ({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (projIdFromURL) {
      if (projData && contracts) {

        const billingAmount = contracts.calculated.reduce((acc, cur) => {
          return acc + cur.totalAmountInclTax;
        }, 0);

        const newValues = produce(initialValues, (draft) => {
          draft.projId = projIdFromURL;
          draft.projName = projData.projName.value;
          draft.billingAmount = String(Math.round(billingAmount) - Math.round(totalInvoice ?? 0));
          draft.contractAmount = String(Math.round(billingAmount));
          draft.billedAmount = String(Math.round(totalInvoice ?? 0));
          contracts.records.forEach((value, idx) => {
            draft.estimates[idx] = {
              estimateId: value.$id.value || '',
              contractAmount: String(Math.round(contracts.calculated[idx].totalAmountInclTax)),
              contractDate: value.contractDate.value,
              isForPayment: !!(+value.isForPayment.value),
            };
          });
        });

        setValues(newValues);
      }
    } else {
      setValues(initialValues);
    }

  }, [projIdFromURL, projInvoiceIdFromURL, setValues, projData, contracts, totalInvoice]);

};