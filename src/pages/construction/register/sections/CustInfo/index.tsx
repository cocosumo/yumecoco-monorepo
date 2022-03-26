import { Grid, Stack } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { getCustomerById } from '../../../../../api/kintone/customers/GET';
import GrayBox from '../../../../../components/ui/containers/GrayBox';
import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import FormikSearchField from '../../../../../components/ui/textfield/FormikSearchField';
import LabeledInfo from '../../../../../components/ui/typographies/LabeledInfo';
import renderOptions from './renderOptions';

enum AgentType {
  coco1 = '営業担当者1',
  coco2 = '営業担当者2',
  yume1 = 'ゆめてつAG1',
  yume2 = 'ゆめてつAG2',
}

const CustInfo = () => {
  const [custGroupRecord, setCustGroupRecord] = useState<CustomerGroupTypes.SavedData>();
  const [field] = useField('custGroupId');
  const [custRecord, setCustomerRecord] = useState<CustomerTypes.SavedData>();

  const handleCustomerChange = async (custGroupRecord: CustomerGroupTypes.SavedData) => {
    const {
      members : {
        value: members,
      },
    } = custGroupRecord;

    const custId = members[0].value.customerId.value;
    console.log(custId, 'record');
    setCustomerRecord((await getCustomerById(custId)).record as unknown as CustomerTypes.SavedData);
    setCustGroupRecord(custGroupRecord);
  };


  console.log(custRecord);
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

                <LabeledInfo label="氏名" data={custRecord?.fullName.value}/>
                <LabeledInfo label="氏名フリガナ" data={custRecord?.fullNameReading.value}/>

              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>

              <Stack spacing={2}>
                {custGroupRecord?.agents
                  .value
                  .map(({ value: { agentType, employeeName } }) => {
                    return <div key={agentType.value}>
                      {AgentType[agentType.value as keyof typeof AgentType]} : {employeeName.value}</div>;
                  })}
              </Stack>

            </Grid>
          </Grid>
        </GrayBox>
      </Grid>
    </>
  );
};


export default CustInfo;