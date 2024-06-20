import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';
import { useContractsByProjIdV2, useInvoicesB2CByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { TForm } from '../schema';


export const useResolveParams = () => {
  const {
    projId,
    invoiceId,
  } = useURLParamsV2();

  const [newFormVal, setNewFormVal] = useState<TForm>({
    ...initialValues,
    projId: projId || '',
  });


  const {
    data: projData,
    isFetching: isFetchingProj,
  } = useProjById(projId || '');

  const {
    data: contractData,
    isFetching: isFetchingContract,
  } = useContractsByProjIdV2(projId || '');

  const {
    data: invoicesB2CData,
    isFetching: isFetchingInvoices,
  } = useInvoicesB2CByProjId(projId || '');

  useEffect(() => {
    if (projData && contractData && invoicesB2CData) {
      const newForm = convertInvoiceToForm({
        projectRec: projData,
        contractRec: contractData,
        invoiceRec: invoicesB2CData,
        invoiceId: invoiceId || undefined,
      });
      setNewFormVal(newForm);
    } else if (projData && !contractData) {
      setNewFormVal({
        ...initialValues,
        projId: projData.uuid.value || '',
        projName: projData.projName.value,
      });
    }
  }, [projData, contractData, invoicesB2CData, invoiceId]);

  return {
    newFormValues: newFormVal,
    isFetching: isFetchingProj || isFetchingContract || isFetchingInvoices,
  };
};
