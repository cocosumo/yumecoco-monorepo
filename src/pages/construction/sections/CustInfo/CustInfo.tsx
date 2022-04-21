import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustGroup } from '../../../../api/kintone/custgroups/GET';

import { getCustomerById } from '../../../../api/kintone/customers/GET';
import { GrayBox } from '../../../../components/ui/containers';
import { PageSubTitle } from '../../../../components/ui/labels/';
import { FormikSearchField } from '../../../../components/ui/textfield';
import { LabeledInfoProps, LabeledInfo } from '../../../../components/ui/typographies/';
import { renderOptions } from './renderOptions';

const AGLabels = {
  cocoAG : '営業担当者',
  yumeAG : 'ゆめてつAG',
};

export const CustInfo = () => {
  const [custGroupRecord, setCustGroupRecord] = useState<CustomerGroupTypes.SavedData>();
  const [custRecord, setCustomerRecord] = useState<CustomerTypes.SavedData>();

  //const custGroupId = useFormikContext<ConstructionDetailsValues>().values.custGroupId;

  const custGroupId = useParams().recordId;

  const handleCustomerChange = async (record: CustomerGroupTypes.SavedData) => {
    if (!record) return;

    const {
      members : {
        value: members,
      },
    } = record;


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
                  .reduce((accu, { id, value: { agentType, employeeName } })=>{
                    const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];
                    const numberedLabel = `${rawLabel}1`;
                    const isExist = accu.some(item => item.label === numberedLabel);
                    const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;

                    return [...accu, { key: id, label: resolvedLabel, data: employeeName.value }];
                  }, [] as Array<LabeledInfoProps & { key: string }>)
                  .map(({ key, label, data }) => {
                    return <LabeledInfo key={key}  {...{ label, data }} />;
                  })
                }
              </Stack>

            </Grid>
          </Grid>
        </GrayBox>
      </Grid>
    </>
  );
};