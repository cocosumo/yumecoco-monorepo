import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useContractsByCustGroupId, useCustGroupById, useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { initialValues, TypeOfForm } from '../form';
import { sortEstimatesByProjId } from '../helper/sortEstimatesByProjId';

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
            contractAmount: String(data.contractAmount),
            billedAmount: tgtBilledAmount,
            billingAmount: String(data.billingAmount),
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