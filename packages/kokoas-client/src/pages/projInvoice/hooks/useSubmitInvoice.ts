import { useFormikContext } from 'formik';
import { useDownloadInvoiceId } from 'kokoas-client/src/hooksQuery';
import { base64ToBlob } from 'kokoas-client/src/lib';
import { TInvoiceStatus, TypeOfForm } from '../form';


export const useSubmitInvoice = () => {

  const {
    submitForm,
    setValues,
    values,
  } = useFormikContext<TypeOfForm>();

  const { invoiceId } = values;

  const { mutateAsync: invoiceDat } = useDownloadInvoiceId();


  const handleSubmit = async (newInvoiceStatus: TInvoiceStatus) => {

    setValues((prev) => {
      return ({
        ...prev,
        invoiceStatus: newInvoiceStatus,
      });
    });

    return submitForm();
  };

  const handlePreview = async (update: boolean) => {

    // サーバからデータ取得
    const {
      pdfDat,
    } = await invoiceDat({ invoiceId, update });


    // base64形式から、blobに変換し、URLでPDFを開く
    const pdfBlob = base64ToBlob(pdfDat, 'application/pdf');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);

  };


  /** 請求書の保存処理(発行はしない) */
  const handleSave = async () => {
    await handleSubmit('created');
  };


  /** 請求書の発行処理 */
  const handleIssue = async () => {
    await handleSubmit('sent');
    handlePreview(true);
  };


  /** 請求書の再発行処理 */
  const handleReissue = () => {
    // const updateIssuedDateTime = handleSubmit(invoiceStatus); // 予定が未定かつ、請求書の日付を更新する場合のみ
    handlePreview(false);
  };


  /** 請求書の破棄 */
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