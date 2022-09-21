import { Formik } from 'formik';
import { useConfirmDialog, useSnackBar } from '../../hooks';
import { saveForm } from './api/saveForm';
import { BtnSaveChoices } from './fieldComponents/formActions/BtnSaveChoices';
import { initialValues, validationSchema } from './form';
import FormProjEstimate from './FormProjEstimate';


export const FormikProjEstimate = () => {
  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setValues }) => {
        const { saveMode } = values;

        const handleSave = (actionAfterSave?: () => void) => setTimeout(() => {
          saveForm(values)
            .then(({ id: estimateId })=>{
              setValues((prev) => ({ ...prev, estimateId }));
              setSnackState({
                open: true,
                severity: 'success',
                message: '保存しました。',
                handleClose: actionAfterSave,
              });
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