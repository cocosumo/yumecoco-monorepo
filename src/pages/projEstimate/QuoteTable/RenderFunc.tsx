import QuoteTable from './QuoteTable';

import { FieldArrayRenderProps, FormikProps } from 'formik';
import { TypeOfForm } from '../form';

export const RenderFunc = (arrayHelpers: FieldArrayRenderProps) => {
  const { form } = arrayHelpers;
  const { values } = form as FormikProps<TypeOfForm>;

  return (
    <QuoteTable arrayHelpers={arrayHelpers} values={values} />
  );
};