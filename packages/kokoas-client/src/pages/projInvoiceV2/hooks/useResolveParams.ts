import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks';
import { useContractsByProjIdV2, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertInvoiceToForm } from '../api/convertInvoiceToForm';
import { TForm } from '../schema';


export const useResolveParams = () => {
  const {
    projId,
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

  /* const {
    data: invoiceData,
    isFetching: isFetchingInvoice,
  } = useInvoiceById(invoiceId); */

  useEffect(() => {
    if (projData && contractData) {
      const newForm = convertInvoiceToForm({ projectRec: projData, contractRec: contractData/* , invoiceRec: invoiceData */ });
      setNewFormVal(newForm);
    } else if (projData && !contractData) {
      setNewFormVal({
        ...initialValues,
        projId: projData.uuid.value || '',
        projName: projData.projName.value,
      });
    }
  }, [projData, contractData]);

  return {
    newFormValues: newFormVal,
    isFetching: isFetchingProj || isFetchingContract,
  };
};
