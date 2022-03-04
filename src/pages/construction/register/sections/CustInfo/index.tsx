import { Grid, Stack } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import GrayBox from '../../../../../components/ui/containers/GrayBox';
import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import FormikSearchField from '../../../../../components/ui/textfield/FormikSearchField';
import LabeledInfo from '../../../../../components/ui/typographies/LabeledInfo';
import renderOptions from './renderOptions';

//import SearchField from '../../../../../components/ui/textfield/SearchField';

const CustInfo = () => {
  const [custGroupRecord, setCustGroupRecord] = useState<CustomerGroupTypes.SavedData>();
  const [field] = useField('custGroupId');
  const [custRecord, setCustomerRecord] = useState<CustomerTypes.SavedData>();

  const handleCustomerChange = (record: CustomerTypes.SavedData) => {
    const { $id } = record;

    console.log($id, 'record!');
  };


  return (
    <>
      <PageSubTitle label="顧客情報"/>
      <Grid item xs={12} md={4} >
        <FormikSearchField renderOptionsFn={renderOptions} name={'custGroupId'} setRecord={handleCustomerChange} label='氏名' helperText='※顧客情報登録を先にしてください。' required/>
      </Grid>

      <Grid item xs={12}>
        <GrayBox label='【参照結果】'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                {/* {['顧客氏名', '現住所', '連絡先', 'メールアドレス' ].map(item => <div key={item}>{item} : </div>)} */}
                <LabeledInfo label="氏名" data={custGroupRecord?.members.value[0].value.customerName.value}/>
                <LabeledInfo label="氏名フリガナ" data={custGroupRecord?.members.value[0].value.customerName.value}/>

                {/* <Caption text='顧客氏名'/>{custGroupRecord?.members.value[0].value.customerName.value} */}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>

              <Stack spacing={2}>

                {['営業担当者1', '営業担当者2', 'ゆめてつAG1', 'ゆめてつAG2' ].map(item => <div key={item}>{item} : </div>)}
              </Stack>

            </Grid>
          </Grid>
        </GrayBox>
      </Grid>
    </>
  );
};


export default CustInfo;