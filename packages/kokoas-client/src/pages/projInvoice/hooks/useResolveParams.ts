import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { getParam } from '../../../helpers/url';
import { TypeOfForm } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const projIdFromURL = getParam('projId');
  const projInvoiceIdFromURL = getParam('invoiceId');

  const {
    setValues,
  } = useFormikContext<TypeOfForm>();


  useEffect(()=>{
    // If projEstimateId got passed, no need to save projId.
    if (projInvoiceIdFromURL) {
      setValues((prev)=>({
        ...prev,
        invoiceId: projInvoiceIdFromURL,
      }));
    } else if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projId: projIdFromURL,
      }));
    }

  }, [projIdFromURL, projInvoiceIdFromURL, setValues]);


};