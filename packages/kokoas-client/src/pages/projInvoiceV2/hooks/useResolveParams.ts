import { useEffect, useState } from 'react';
import { initInvDetailsValue, initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';
import { useContractsByProjIdV2, useInvoiceB2CById, useInvoicesB2CByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { TForm, TInvoiceDetails } from '../schema';



const strConvDate = (dateStr: string | undefined) => {
  if (!dateStr) return null;

  return new Date(dateStr);
};

export const useResolveParams = () => {
  const {
    projId: projIdFromURL,
    invoiceId: invIdFromURL,
  } = useURLParamsV2();


  const [newFormVal, setNewFormVal] = useState<TForm>({
    ...initialValues,
    projId: projIdFromURL || '',
  });

  const {
    data: contractData,
    isFetching: isFetchingContract,
  } = useContractsByProjIdV2(projIdFromURL || '');

  const {
    data: invoicesB2CByProjId,
    isFetching: isFetchingInvoices,
  } = useInvoicesB2CByProjId(projIdFromURL || '');

  const {
    data: projData,
    isFetching: isFetchingProj,
  } = useProjById(projIdFromURL || '');

  const {
    data: invoiceB2CById,
    isFetching: isFetchingInvoice,
  } = useInvoiceB2CById(invIdFromURL || '');


  useEffect(() => {
    if (projIdFromURL && projData && contractData && !invIdFromURL) {
      // 新規
      const newForm = convertInvoiceToForm({
        projectRec: projData,
        contractRec: contractData,
        invoiceRec: invoicesB2CByProjId,
      });
      setNewFormVal(newForm);

    } else if (projIdFromURL && projData && contractData && invoiceB2CById) {
      // 請求書編集
      let newInVoiceDetails: TInvoiceDetails = invoiceB2CById.invoiceDetails.value.map(({
        id,
        value: invoiceDetail,
      }) => {
        return ({
          invoiceDetailId: id,
          billingAmount: +invoiceDetail.billingAmountAfterTax.value,
          invoiceItem: invoiceDetail.invoiceItem.value,
        });
      });

      if (newInVoiceDetails.length === 0) {
        newInVoiceDetails = [initInvDetailsValue];
      }

      const newForm = convertInvoiceToForm({
        projectRec: projData,
        contractRec: contractData,
        invoiceRec: invoicesB2CByProjId,
      });
      setNewFormVal({
        ...newForm,
        invoiceId: invoiceB2CById?.uuid?.value,
        invoiceStatus: invoiceB2CById?.invoiceStatus?.value,
        invoiceDataId: invoiceB2CById?.invoiceDataId?.value,
        billingAmount: +invoiceB2CById?.billingTotalAmount?.value,
        invoiceIssueDate: strConvDate(invoiceB2CById?.invoiceIssueDate?.value),
        scheduledPayDate: strConvDate(invoiceB2CById?.scheduledPayDate?.value),
        payMethodPlan: invoiceB2CById?.payMethodPlan?.value,
        remarks: invoiceB2CById?.remarks?.value,
        paymentStatus: invoiceB2CById?.paymentStatus?.value,
        invoiceDetails: newInVoiceDetails,
      });
    } else {
      // 工事非選択時
      setNewFormVal(initialValues);
    }
  }, [
    projData,
    contractData,
    invoicesB2CByProjId,
    invIdFromURL,
    projIdFromURL,
    invoiceB2CById,
  ]);

  return {
    newFormValues: newFormVal,
    isFetching: isFetchingProj || isFetchingContract || isFetchingInvoices || isFetchingInvoice,
  };
};
