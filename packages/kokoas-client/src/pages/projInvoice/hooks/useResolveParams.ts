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
  const { data: invoices } = useInvoiceTotalByCustGroupId(custGroupIdFromURL || '');
  const { totalInvoice } = invoices || {}; // 削除予定



  useEffect(() => {
    if (projInvoiceIdFromURL) {
      setValues((prev) => ({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL) {
      if (custData && contracts) {

        const billingAmount = contracts.calculated.reduce((acc, cur) => {
          return acc + cur.summary.totalAmountAfterTax;
        }, 0);

        const newValues = produce(initialValues, (draft) => {
          draft.custGroupId = custGroupIdFromURL;
          draft.custName = custData.custNames.value;
          draft.billingAmount = String(Math.round(billingAmount) - Math.round(totalInvoice ?? 0));
          draft.contractAmount = String(Math.round(billingAmount));
          draft.billedAmount = String(Math.round(totalInvoice ?? 0));
          contracts.records.forEach((record, idx) => {
            draft.estimates[idx] = {
              projId: record.projId.value,
              projTypeName: record.工事種別名.value,
              dataId: record.dataId.value || '',
              amountPerContract: String(contracts.calculated[idx].summary.totalAmountAfterTax),
              amountType: '',
              isForPayment: !!(+record.isForPayment.value),
              estimateId: record.uuid.value,
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