import { Formik } from 'formik';

import { useNavigate } from 'react-router-dom';

import { FormConstruction } from './FormConstruction';

import { pages } from '../Router';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { NextStepChoices } from './parts/NextStepChoices';
import { generateParams } from '../../helpers/url';
import { convertToKintone } from './api/convertToKintone';
import  { useSaveProject } from './../../hooksQuery';
import { useResolveParams } from './hooks/useResolveParams';
import { validationSchema } from './validationSchema';




export const FormikConstruction  = () => {

  const { setDialogState } = useConfirmDialog();
  const navigate = useNavigate();
  const { mutateAsync } = useSaveProject();

  const initialValues = useResolveParams();



  return (
    <Formik
      validateOnMount
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { projId } = values;

        const kintoneRecord = convertToKintone(values);
        const resp = await mutateAsync({
          record: kintoneRecord,
          projId,
        });

        setDialogState({
          title: '次へ進む',
          content: <NextStepChoices recordId={resp?.id} />,
          withYes: false,
          noText: '閉じる',
        });

        navigate(`${pages.projEdit}?${generateParams({
          projId: resp.id,
        })}`);


      }}
    >
      <FormConstruction />

    </Formik>
  );
};