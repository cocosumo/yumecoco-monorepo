import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useContractsByCustGroupId, useCustGroupById, useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { initialValues, TypeOfForm } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const custGroupIdFromURL = getParam('custGroupId');
  const projInvoiceIdFromURL = getParam('invoiceId');

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { data: custData } = useCustGroupById(custGroupIdFromURL || '');
  const { data: contracts } = useContractsByCustGroupId(custGroupIdFromURL || '');
  const { data } = useInvoiceTotalByCustGroupId(custGroupIdFromURL || '');
  const { totalInvoice } = data || {};


  useEffect(() => {
    // If projEstimateId got passed, no need to save projId.
    if (projInvoiceIdFromURL) {
      setValues((prev) => ({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL) {
      if (custData && contracts) {

        const billingAmount = contracts.calculated.reduce((acc, cur) => {
          return acc + cur.totalAmountInclTax;
        }, 0);

        const newValues = produce(initialValues, (draft) => {
          draft.custGroupId = custGroupIdFromURL;
          draft.custName = custData.custNames.value;
          draft.billingAmount = String(Math.round(billingAmount) - Math.round(totalInvoice ?? 0));
          draft.contractAmount = String(Math.round(billingAmount));
          draft.billedAmount = String(Math.round(totalInvoice ?? 0));
          contracts.records.forEach((value, idx) => {
            draft.estimates[idx] = {
              projId: value.projId.value,
              projTypeName: '', /* dummy */
              estimateId: value.$id.value || '',
              dataId: value.dataId.value || '',
              amountType: '',
              amountPerContract: '',
              isForPayment: false, /* dummy */
            };
          });
        });

        setValues(newValues);
      }
    } else {
      setValues(initialValues);
    }

  }, [custGroupIdFromURL, projInvoiceIdFromURL, setValues, custData, contracts, totalInvoice]);

};