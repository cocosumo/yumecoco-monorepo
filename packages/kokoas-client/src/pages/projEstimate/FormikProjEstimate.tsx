import { Formik } from 'formik';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery/useSaveEstimate';
import { useConfirmDialog, useSnackBar } from '../../hooks';
import { convertToKintone } from './api/convertToKintone';
import { BtnSaveChoices } from './fieldComponents/formActions/BtnSaveChoices';
import { initialValues, validationSchema } from './form';
import FormProjEstimate from './FormProjEstimate';


export const FormikProjEstimate = () => {
  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const { mutateAsync: saveMutation } = useSaveEstimate();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { saveMode, estimateId  } = values;

        const handleSave = (actionAfterSave?: () => void) => setTimeout(() => {
          const record = convertToKintone(values);
          saveMutation({
            recordId: estimateId,
            record,
          })
            .then(({ id })=>{
              setSnackState({
                open: true,
                severity: 'success',
                message: '保存しました。',
                handleClose: actionAfterSave,
              });

              /*
                保存が成功したら、フォームのmeta (dirtyやtouched) をリセットする。
                これで、Formikのdirtyで保存されていない変更があるかどうか判定出来る。
              */
              resetForm({ values: { ...values, estimateId: id } });
            })
            .catch((err)=>{
              setSnackState({
                open: true,
                severity: 'error',
                message: `保存が失敗しました。${err.message}`,
              });
            })
            .finally(()=>{
              setSubmitting(false);
            });
        }, 1500); // Throttle to limit API calls

        /** 一時保存 */
        if (saveMode === 'temporary') {
          handleSave();
        }

        /** 保存 */
        if (saveMode === 'normal') {
          setDialogState({
            title: '編集した内容で保存します',
            content: (
              <BtnSaveChoices
                handleClose={handleClose}
                handleSave={handleSave}
              />),
            withNo: false, withYes: false,
          });
        }
      }}
    >

      <FormProjEstimate />
    </Formik>
  );
};