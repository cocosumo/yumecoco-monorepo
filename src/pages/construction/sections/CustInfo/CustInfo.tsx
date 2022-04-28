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
import { useFormikContext } from 'formik';
import { ConstructionDetailsType } from '../../form';
import { KeyOfConstructionDetails } from '../..';
import { AGLabels } from '../../../../api/kintone/employees/GET';

const contactLabels = {
  tel: '電話番号',
  email: 'メールアドレス',
};



export const CustInfo = (props : {
  custGroupRecord?: CustomerGroupTypes.SavedData,
  handleSetCustGroupRecord: (record: CustomerGroupTypes.SavedData) => void
}) => {
  const { custGroupRecord, handleSetCustGroupRecord } = props;
  const [custRecord, setCustomerRecord] = useState<CustomerTypes.SavedData>();
  const { values, setFieldValue } = useFormikContext<ConstructionDetailsType>();


  const {
    postalCode,  address1, address2,
    fullName, fullNameReading,
    contacts,
  } = custRecord ?? {};


  const {
    custGroupId,
  } = values;

  const recordId = useParams().recordId;


  const handleCustomerChange = async (record: CustomerGroupTypes.SavedData) => {
    if (!record) return;
    const {
      $id,
      members : {
        value: members,
      },
    } = record;

    setFieldValue('custGroupId' as KeyOfConstructionDetails, $id.value);
    const mainCustId = members[0].value.customerId.value;
    /* Retrieve data from each customer in the group */
    setCustomerRecord((await getCustomerById(mainCustId)).record as unknown as CustomerTypes.SavedData);
    handleSetCustGroupRecord(record);
  };

  useEffect(()=>{
    if (recordId && custGroupId){
      getCustGroup(custGroupId)
        .then(resp => {
          handleCustomerChange(resp.record as unknown as CustomerGroupTypes.SavedData);
        });
    }
  }, [recordId, custGroupId]);


  console.log(custGroupRecord);
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
                <LabeledInfo label="氏名" data={fullName?.value}/>
                <LabeledInfo label="氏名フリガナ" data={fullNameReading?.value}/>
                <LabeledInfo
                  label="現住所"
                  data={[postalCode?.value, address1?.value, address2?.value]
                    .join(' ')}
                />
                {
                  contacts?.value
                    .filter(item => item.value.contactValue.value)
                    .map(({ id: rowId, value: { contactType, contactValue, relation } }) => {
                      return <LabeledInfo
                    key={rowId}
                    label={contactLabels[contactType?.value as keyof typeof contactLabels] ?? '連絡先'}
                    data={[contactValue?.value, relation?.value].join(', ')}
                    />;

                    })
                }

                {
                  custGroupRecord?.members.value.reduce((accu, curr, index: number) => {
                    if (index > 0){
                      return [...accu, <LabeledInfo key={curr.id} label={`契約者${index + 1}`} data={curr.value.customerName.value}/>];
                    }
                    return accu;
                  }, [] as typeof LabeledInfo[])
                }

              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>

              <Stack spacing={2}>
                {custGroupRecord?.agents
                  .value
                  .reduce((accu, { id, value: { agentType, employeeName } })=>{
                    const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];
                    const numberedLabel = `${rawLabel ?? '担当者'}1`;
                    const isExist = accu.some(item => item.label === numberedLabel);
                    const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;

                    return [...accu, { key: id, label: resolvedLabel, data: employeeName.value }];
                  }, [] as Array<LabeledInfoProps & { key: string }>)
                  .map(({ key, label, data }) => {
                    return <LabeledInfo key={key}  {...{ label, data }} />;
                  })
                }
                <LabeledInfo label={'グループ番号'} data={custGroupId} />
                <LabeledInfo label={'顧客番号'} data={custRecord?.$id.value} />
              </Stack>

            </Grid>
          </Grid>
        </GrayBox>
      </Grid>
    </>
  );
};