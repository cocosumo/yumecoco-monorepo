import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useContractsByCustGroupId, useCustGroupById } from 'kokoas-client/src/hooksQuery';
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



  useEffect(() => {


    if (projInvoiceIdFromURL) {
      setValues((prev) => ({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (custGroupIdFromURL && custData && contracts) {

      const newEstimates = sortEstimatesByProjId(contracts);
      const billingAmount = contracts.calculated.reduce((acc, cur) => {
        return acc + cur.summary.totalAmountAfterTax;
      }, 0);

      const newValues = produce(initialValues, (draft) => {
        draft.custGroupId = custGroupIdFromURL;
        draft.custName = custData.custNames.value;
        // draft.billingAmount = String(Math.round(billingAmount) - Math.round(totalInvoice ?? 0));
        draft.contractAmount = String(Math.round(billingAmount));
        // draft.billedAmount = String(Math.round(totalInvoice ?? 0));
        newEstimates?.forEach((data, idx) => {
          draft.estimates[idx] = {
            estimateIndex: String(idx),
            projId: data.projId,
            projTypeName: data.projTypeName,
            dataId: data.dataId,
            amountPerContract: data.amountPerContract,
            amountType: data.amountType,
            isForPayment: data.isForPayment,
            estimateId: data.estimateId,
          };
        });
      });

      setValues(newValues);

    } else {
      setValues(initialValues);
    }

  }, [custGroupIdFromURL, projInvoiceIdFromURL, setValues, custData, contracts]);

};