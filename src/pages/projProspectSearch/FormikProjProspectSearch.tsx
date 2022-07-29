import { Formik } from 'formik';
import { useState } from 'react';
import { useSnackBar } from '../../hooks';
import { searchProject, TSearchResult } from './api/searchProject';
import { initialValues } from './form';
import { FormProjProspectSearch } from './FormProjProspectSearch';



export const FormikProjProspectSearch = () => {
  const [list, setList] = useState<TSearchResult>();
  const { setSnackState } = useSnackBar();

  console.log(list);
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {

        setTimeout(()=>{
          searchProject(values)
            .then(res => {
              setList(res);
            })
            .catch(err => {
              console.log(err);
              setSnackState({
                open:true,
                autoHideDuration: 20000,
                severity: 'error',
                message: `エラーが発生しました。管理者にご連絡ください。${err.message}`,
              });
            })
            .finally(()=>{
              setSubmitting(false);
            });

        }, 2000);

      }}
    >

      <FormProjProspectSearch list={list}/>

    </Formik>
  );
};