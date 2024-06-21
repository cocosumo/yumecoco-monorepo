import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';
import { useContractsByProjIdV2, useInvoicesB2CByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { TForm } from '../schema';


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


  useEffect(() => {
    if (projIdFromURL && projData && contractData) {
      // 新規 or 見積編集
      const newForm = convertInvoiceToForm({
        projectRec: projData,
        contractRec: contractData,
        invoiceRec: invoicesB2CByProjId,
        invoiceId: invIdFromURL || undefined,
      });
      setNewFormVal(newForm);
    } else {
      setNewFormVal(initialValues);
    }
  }, [
    projData,
    contractData,
    invoicesB2CByProjId,
    invIdFromURL,
    projIdFromURL,
  ]);

  return {
    newFormValues: newFormVal,
    isFetching: isFetchingProj || isFetchingContract || isFetchingInvoices,
  };
};
