import { Formik } from 'formik';
import { FormIndividualCustomer } from './FormIndividualCustomer';
import { useNavigate  } from 'react-router-dom';
import { MemoContextProvider } from './parts/Memo/memoForm/MemoContext';
import { FormikMemo } from './parts/Memo/memoForm/FormikMemo';
import { pages } from '../../Router';
import { useConfirmDialog } from  './../../../hooks';
import { generateParams } from '../../../helpers/url';
import { useSaveCustGroup } from '../../../hooksQuery/useSaveCustGroup';
import { formToDBCustomers } from './helper/formToDBCustomers';
import { formToDBCustGroup } from './helper/formToDBCustGroup';
import { useEmployees } from '../../../hooksQuery';
import { useResolveParam } from './hooks/useResolveParam';
import { validationSchema } from './validationSchema';
import { useIsFetching } from '@tanstack/react-query';
import { LinearProgress } from '@mui/material';



export const FormikIndividualCustomer = () => {
  const isFetching = !!useIsFetching();
  const { mutateAsync: saveCustGroupMutation } = useSaveCustGroup();
  const { data: employees } = useEmployees();

  const { setDialogState } = useConfirmDialog();
  const {
    initialState,
    passedProjId,
  } = useResolveParam();

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

  if (isFetching) {
    return <LinearProgress />;
  }


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
          const custGroupRecord = formToDBCustGroup(values, employees || []);

          const { id: custGroupId } = await saveCustGroupMutation({
            custGroupId: values.id,
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