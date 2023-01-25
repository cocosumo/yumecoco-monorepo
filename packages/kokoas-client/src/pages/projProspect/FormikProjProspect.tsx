import { Formik } from 'formik';
import { validationSchema } from './form';
import { FormProjProspect } from './FormProjProspect';
import { useResolveParams } from './hooks/useResolveParams';
import { useSaveProject } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from './api/convertToKintone';

export const FormikProjProspect = () => {

  const initialValues = useResolveParams();
  const { mutateAsync } = useSaveProject();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values) => {

        const newRecord = convertToKintone(values);
        await mutateAsync({
          record: newRecord,
          projId: values.projId,
        });

      }}
    >

      <FormProjProspect />
    </Formik>
  );
};