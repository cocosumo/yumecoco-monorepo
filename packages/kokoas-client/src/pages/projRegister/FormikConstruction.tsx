import { Formik } from 'formik';

import { validationSchema, initialValues } from './form';

import { useNavigate } from 'react-router-dom';

import { FormConstruction } from './FormConstruction';

import { pages } from '../Router';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import { NextStepChoices } from './parts/NextStepChoices';
import { generateParams } from '../../helpers/url';
import { convertToKintone } from './api/convertToKintone';
import { useSaveProject } from 'kokoas-client/src/hooksQuery/useSaveProject';




export const FormikConstruction  = () => {

  const { setDialogState } = useConfirmDialog();
  const navigate = useNavigate();
  const { mutateAsync } = useSaveProject();

  return (
    <Formik
      initialStatus={((s: TFormStatus)=> s)('busy')}
      validateOnMount
      //enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { recordId } = values;
        const kintoneRecord = convertToKintone(values);

        const resp = await mutateAsync({
          record: kintoneRecord,
          projId: recordId,
        });

        setDialogState({
          title: '次へ進む',
          content: <NextStepChoices recordId={resp.id} />,
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