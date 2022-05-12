import { Formik } from 'formik';
import {  CustomerForm, initialValues, validationSchema } from './form';
import { IndividualCustomerForm } from './IndividualCustomerForm';
import { useState, useEffect, useRef  } from 'react';
import FormSnack, { SnackState } from '../../../components/ui/snacks/FormSnack';
import { saveFormData } from './api/saveFormData';

import { useNavigate, useParams  } from 'react-router-dom';
import { getFormDataById } from './api/getFormDataById';
import { MemoContextProvider } from './parts/Memo/memoForm/MemoContext';
import { FormikMemo } from './parts/Memo/memoForm/FormikMemo';
import { ConfirmDialog } from '../../../components/ui/dialogs/ConfirmDialog';
import { pages } from '../../Router';



export const FormikIndividualCustomer = () => {
  const [snackState, setSnackState] = useState<SnackState>({ open:false });
  const [confirmNavigate, setConfirmNavigate] = useState(false);
  const [initialState, setInitialState] = useState<CustomerForm>(initialValues);
  const savedCustGroupId = useRef<string>();

  const recordId  = useParams().recordId;
  const navigate = useNavigate();


  const handleNavigate = (isYes: boolean) => {
    if (isYes)  navigate(`${pages.projReg}`);
    if (!isYes)  navigate(`${pages.custGroupEdit}${savedCustGroupId.current}`);

    setConfirmNavigate(false);
  };

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

        validateOnChange={true}
        validateOnMount
        initialValues={initialState}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submitState', values);
          saveFormData({ ...values, id: recordId })
            .then((resp)=>{
              savedCustGroupId.current = resp.id;

              setSnackState(()=>{
                return {
                  open: true,
                  message: '保存出来ました。',
                  handleClose: ()=> {
                    setConfirmNavigate(true);
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
      <FormikMemo  />
      <FormSnack
        snackState={snackState}
        handleClose={()=> {
          if (snackState.handleClose){
            snackState?.handleClose();
          }
          setSnackState(prev => ({ ...prev, open: false }));

        }}/>
      <ConfirmDialog
        open={confirmNavigate}
        title={'次へ'}
        content={'工事情報を登録しますか'}
        handleAnswer={handleNavigate}

      />
    </MemoContextProvider>
  );
};