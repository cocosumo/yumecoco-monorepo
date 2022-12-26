import { Formik } from 'formik';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useSaveEstimate } from 'kokoas-client/src/hooksQuery/useSaveEstimate';
import { useNavigate } from 'react-router-dom';
import { useConfirmDialog, useSnackBar } from '../../hooks';
import { convertToKintone } from './api/convertToKintone';
import { BtnSaveChoices } from './fieldComponents/formActions/BtnSaveChoices';
import FormProjEstimate from './FormProjEstimate';
import { validationSchema } from './validationSchema';
import { useResolveParam } from './hooks/useResolveParam';


export const FormikProjEstimate = () => {
  const { setSnackState } = useSnackBar();
  const { setDialogState, handleClose } = useConfirmDialog();
  const navigate = useNavigate();
  const { mutateAsync: saveMutation } = useSaveEstimate();

  const {
    initialForm,
  } = useResolveParam();

  return (
    <Formik
      initialValues={initialForm}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { saveMode, estimateId  } = values;

        const handleSave = async () => {
          const record = convertToKintone(values);

          const { id } = await saveMutation({
            recordId: estimateId,
            record,
            relatedData: {
              projDataId: values.projDataId,
            },
          });

          setSnackState({
            open: true,
            severity: 'success',
            message: '保存しました。',
          });

          setSubmitting(false);
          return id;

        };

        /** 一時保存 */
        if (saveMode === 'temporary') {
          const id =  await handleSave();
          navigate(`?${generateParams({ projEstimateId: id })}`);
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