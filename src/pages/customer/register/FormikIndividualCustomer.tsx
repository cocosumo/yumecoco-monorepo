import { Formik } from 'formik';
import {  CustomerForm, initialValues, validationSchema } from './form';
import { FormIndividualCustomer } from './FormIndividualCustomer';
import { useState, useEffect  } from 'react';

import { useNavigate  } from 'react-router-dom';
import { getFormDataById } from './api/getFormDataById';
import { MemoContextProvider } from './parts/Memo/memoForm/MemoContext';
import { FormikMemo } from './parts/Memo/memoForm/FormikMemo';
import { pages } from '../../Router';
import { useConfirmDialog } from  './../../../hooks';
import { generateParams, getParam } from '../../../helpers/url';
import { useSaveCustGroup } from '../../../hooksQuery/useSaveCustGroup';
import { formToDBCustomers } from './helper/formToDBCustomers';
import { formToDBCustGroup } from './helper/formToDBCustGroup';



export const FormikIndividualCustomer = () => {
  const { mutateAsync: saveCustGroupMutation } = useSaveCustGroup();
  const { setDialogState } = useConfirmDialog();
  const [initialState, setInitialState] = useState<CustomerForm>(initialValues);

  const recordId = getParam('custGroupId') ?? '';
  const passedProjId = getParam('projId');
  const navigate = useNavigate();


  const handleNavigate = (custGroupId: string) => {
    if (!passedProjId) {
      setDialogState({
        title: '次へ進む',
        content: '工事情報を登録しますか。',
        handleYes: ()=>navigate(`${pages.projReg}?${generateParams({
          custGroupId,
        })}`),
        handleNo: ()=>navigate(`${pages.custGroupEdit}?${generateParams({
          custGroupId,
        })}`),
      });
    }
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
        onSubmit={async (values) => {


          const customerRecords = formToDBCustomers(values);
          const custGroupRecord = formToDBCustGroup(values);

          const { id: custGroupId } = await saveCustGroupMutation({
            custGroupId: recordId,
            record: custGroupRecord,
            customerRecords,
          });

          handleNavigate(custGroupId);

        }}
      >

        <FormIndividualCustomer  />

      </Formik>
      <FormikMemo  />
    </MemoContextProvider>
  );
};