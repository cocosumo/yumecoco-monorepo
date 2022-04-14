import { Formik } from 'formik';
import { initialValues, validationSchema } from './form';
import { IndividualCustomerForm } from './IndividualCustomerForm';
import { useState } from 'react';
import FormSnack, { SnackState } from '../../../components/ui/snacks/FormSnack';
//import { getFlatConstDetails } from '../../../api/kintone/construction';
// import { useParams } from 'react-router-dom';



export const FormikIndividualCustomer = () => {
  const [snackState, setSnackState] = useState<SnackState>({ open:false });
  //const [initialState, setInitialState] = useState(initialValues);
  //const constructionId  = useParams().constructionId;
  //const navigate = useNavigate();
  /**
  useEffect(()=>{
     If edit mode
    if (constructionId){
       getFlatConstDetails(constructionId)
        .then((flatRecord) => {
          setInitialState(flatRecord);
        });
    }
  }, [constructionId]);
*/
  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnMount={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values );
          /* saveConstructionData({ ...values, $id: constructionId })
            .then((resp)=>{
              setSnackState({ open: true, message: '保存出来ました。' });
              setSubmitting(false);
              navigate(`/construction/edit/${resp.id}`);
            }); */

          setSubmitting(false);
        }}
      >
        <IndividualCustomerForm handleSnack={(snackParam) => setSnackState(snackParam)} />

      </Formik>
      <FormSnack snackState={snackState} handleClose={()=> setSnackState(prev => ({ ...prev, open: false }))}/>
    </>
  );
};