import { Formik } from 'formik';
import {  CustomerForm, initialValues, validationSchema } from './form';
import { IndividualCustomerForm } from './IndividualCustomerForm';
import { useState, useEffect } from 'react';
import FormSnack, { SnackState } from '../../../components/ui/snacks/FormSnack';
import { saveFormData } from './api/saveFormData';

import { useNavigate, useParams  } from 'react-router-dom';
import { getFormDataById } from './api/getFormDataById';
import { MemoContextProvider } from './parts/Memo/memoForm/MemoContext';
import { FormikMemo } from './parts/Memo/memoForm/FormikMemo';


export const FormikIndividualCustomer = () => {
  const [snackState, setSnackState] = useState<SnackState>({ open:false });
  const [initialState, setInitialState] = useState<CustomerForm>(initialValues);

  const recordId  = useParams().recordId;
  const navigate = useNavigate();



  useEffect(()=>{

    if (!recordId) return;
    /* If edit mode */
    getFormDataById(recordId)
      .then(resp => {
        setInitialState(resp);
      });
    
  }, [recordId]);



  return (
    <MemoContextProvider>
      <Formik
       
        validateOnChange={false}
        validateOnMount
        initialValues={initialState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submitState', values);
          saveFormData({ ...values, id: recordId })
            .then((resp)=>{
              setSnackState(()=>{ 
                return { 
                  open: true, 
                  message: '保存出来ました。',
                  handleClose: ()=> {
                    navigate(`/custgroup/edit/${resp.id}`);
                    setSnackState(prev => ({ ...prev, open: false }));
                  },
                }; 
              });
              setSubmitting(false);
              
            })
            .catch(err => {
              console.error(err);
              setSnackState({ open: true, message: 'エラーが発生しました。このエラーの再現について、管理者を連絡してください。' + err });
              setSubmitting(false);
            });

       
        }}
      >

        <IndividualCustomerForm handleSnack={(snackParam) => setSnackState(snackParam)} />

      </Formik>
      <FormikMemo/>
      <FormSnack 
        snackState={snackState} 
        handleClose={()=> {
          if (snackState.handleClose){
            snackState?.handleClose(); 
          } else {
            setSnackState(prev => ({ ...prev, open: false }));
          }
        }}/>
    </MemoContextProvider>
  );
};