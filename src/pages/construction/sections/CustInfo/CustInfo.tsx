import { Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { getCustGroup } from '../../../../api/kintone/custgroups/GET';

import { getCustomerById } from '../../../../api/kintone/customers/GET';
import GrayBox from '../../../../components/ui/containers/GrayBox';
import PageSubTitle from '../../../../components/ui/labels/PageSubTitle';
import { FormikSearchField } from '../../../../components/ui/textfield';
import LabeledInfo from '../../../../components/ui/typographies/LabeledInfo';
import { ConstructionDetailsValues } from '../../form';
import { renderOptions } from './renderOptions';

enum AgentType {
  coco1 = '営業担当者1',
  coco2 = '営業担当者2',
  yume1 = 'ゆめてつAG1',
  yume2 = 'ゆめてつAG2',
}

export const CustInfo = () => {
  const [custGroupRecord, setCustGroupRecord] = useState<CustomerGroupTypes.SavedData>();
  const [custRecord, setCustomerRecord] = useState<CustomerTypes.SavedData>();

  const custGroupId = useFormikContext<ConstructionDetailsValues>().values.custGroupId;

  const handleCustomerChange = async (record: CustomerGroupTypes.SavedData) => {
    if (!record) return;

    const {
      members : {
        value: members,
      },
    } = record;

    /** Get Id of main customer */
    const custId = members[0].value.customerId.value;

    setCustomerRecord((await getCustomerById(custId)).record as unknown as CustomerTypes.SavedData);
    setCustGroupRecord(record);
  };

  useEffect(()=>{
    if (custGroupId){
      getCustGroup(custGroupId.toString())
        .then(resp => {
          handleCustomerChange(resp.record);
        });
    }
  }, [custGroupId]);



  return (
    <>
      <PageSubTitle label="顧客情報"/>
      <Grid item xs={12} md={4} >
        <FormikSearchField renderOptionsFn={renderOptions} name={'custGroupId'} setRecord={handleCustomerChange} label='氏名（検索）' helperText='※顧客情報登録を先にしてください。' required/>
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
                    return (
                      <LabeledInfo key={agentType.value} label={AgentType[agentType.value as keyof typeof AgentType]} data={employeeName.value} />
                    );
                  })}
              </Stack>

            </Grid>
          </Grid>
        </GrayBox>
      </Grid>
    </>
  );
};