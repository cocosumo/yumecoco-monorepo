import { Formik } from 'formik';
import { useConfirmDialog, useSnackBar } from '../../hooks';
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
      onSubmit={(values, { setSubmitting }) => {
        const { saveMode } = values;
        /* kintoneに保存する処理を追加する */

        if (saveMode === 'temporary') {
          setTimeout(()=>{
            setSnackState({
              open: true,
              message: '保存しました。',
            });
            setSubmitting(false);
          }, 1500);

        }


        if (saveMode === 'normal') {
          setDialogState({
            title: '編集した内容で保存します',
            content: (
              <BtnSaveChoices
                handleClose={handleClose}
                setSubmitting={setSubmitting}
                values={values}
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