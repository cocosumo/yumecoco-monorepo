import { useFormikContext } from 'formik';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { TInvoiceStatus, TypeOfForm } from '../form';


export const useSubmitInvoice = () => {

  const { setSnackState } = useSnackBar();
  const {
    submitForm,
    setValues,
    // values,
  } = useFormikContext<TypeOfForm>();

  // const { invoiceStatus } = values;

  const handleSubmit = (newInvoiceStatus: TInvoiceStatus) => {

    setValues((prev) => {
      return ({
        ...prev,
        invoiceStatus: newInvoiceStatus,
      });
    });

    submitForm();
  };

  const handlePreview = () => {

    setSnackState({
      open: true,
      severity: 'warning',
      message: '開発中です',
    });
  };

  const handleSave = () => {
    handleSubmit('created');
  };

  const handleIssue = () => {
    handleSubmit('sent');
    handlePreview();
  };

  const handleReissue = () => {
    // handleSubmit(invoiceStatus); // 予定が未定かつ、請求書の日付を更新する場合のみ
    handlePreview();
  };

  const handleVoided = () => {
    handleSubmit('voided');
  };


  return {
    handleSave,
    handleIssue,
    handleReissue,
    handleVoided,
  };
};