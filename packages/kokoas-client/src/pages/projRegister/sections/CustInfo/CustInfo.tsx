import { Button, Grid } from '@mui/material';
import { ComponentProps, useEffect } from 'react';
import {  OutlinedDiv } from '../../../../components/ui/containers';
import { PageSubTitle } from '../../../../components/ui/labels/';
import EditIcon from '@mui/icons-material/Edit';
import {  useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { TypeOfForm, getFieldName, initialValues } from '../../form';
import { CustomerInstance } from '../../../customer/register/form';
import { pages } from '../../../Router';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { generateParams } from '../../../../helpers/url';
import { Column1 } from './Column1';
import { Column2 } from './Column2';
import { LabeledInfo } from '../../../../components/ui/typographies';
import { AGLabels } from 'types';
import { FormikSearchCustGroup } from 'kokoas-client/src/components/ui/textfield/FormikSearchCustGroup';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useFormikReset } from 'kokoas-client/src/hooks/useFormikReset';



export const CustInfo = () => {

  const { status, values, setValues } = useFormikContext<TypeOfForm>();
  const handleReset = useFormikReset<TypeOfForm>();
  const navigate = useNavigate();

  const isReadOnly = (status as TFormStatus ) === 'disabled';

  const {
    custGroupId,
    projTypeName,
    recordId,
  } = values;

  const { data: custGroupRecord } = useCustGroupById(custGroupId ?? '');

  const {
    members,
    storeId,
    territory,
    storeName,
  } = custGroupRecord ?? {};

  const {
    customerId,
    address1,
    address2,
    postal: postalCode,
    customerName,
    dump,
  } = members?.value[0]?.value ?? {}; // Main Customer

  const {
    custNameReading,
    email, emailRel,
    phone1, phone1Rel,
    phone2, phone2Rel,
  } = JSON.parse(dump?.value || 'null') as CustomerInstance ?? {};

  /* フォームリセットする */
  useEffect(() => {
    if (custGroupId) {
      handleReset({
        values: {
          ...initialValues,
          custGroupId: custGroupId,
          custName: customerName?.value || '',
          storeId: storeId?.value || '',
          territory: territory?.value || '',
          projName: `${customerName?.value}様邸`,
        },
      });
    }

  }, [storeId?.value, territory?.value, customerName?.value, custGroupId, handleReset]);


  /* 工事名を生成する */
  useEffect(()=>{
    setValues(prev => ({
      ...prev,
      projName: `${prev.custName ?? '--'}様邸 ${projTypeName ?? '--'}`,
    }));
  }, [projTypeName, setValues]);

  const refactoredAgents = custGroupRecord?.agents
    .value
    .reduce((accu, { id, value: { agentType, employeeName } })=>{
      const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];

      const numberedLabel = `${rawLabel ?? '担当者'}1`;

      const isExist = accu.some(item => item.label === numberedLabel);
      const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;
      return [...accu, { key: id, label: resolvedLabel, info: employeeName.value }];
    }, [] as Array<ComponentProps<typeof LabeledInfo> & { key: string }>) ?? [];


  return (
    <>
      <PageSubTitle label="顧客情報" />
      <Grid item xs={12} md={4} >
        <FormikSearchCustGroup 
          label="顧客検索"
          name={getFieldName('custGroupId')}
        />
      </Grid>

      <Grid item xs={12}>

        {custGroupId &&
          <OutlinedDiv label='参照結果'>
            <Grid container spacing={2} justifyContent="center"
              p={4}
            >
              <Column1
                custDetail={{
                  customerName: customerName?.value ?? '',
                  custNameReading: custNameReading,
                  address: `${postalCode?.value}〒 ${address1?.value}${address2?.value}`,
                  email, emailRel,
                  phone1, phone1Rel,
                  phone2, phone2Rel,
                }}
              />

              <Column2
                adminInfo={{
                  custGroupId,
                  customerId: customerId?.value ?? '',
                  storeName: storeName?.value ?? '',
                  agents: refactoredAgents,
                }}
              />

              {!isReadOnly &&

                <Grid item xs={3}>

                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<EditIcon />}
                    onClick={()=>navigate(`${pages.custGroupEdit}?${generateParams({
                      custGroupId,
                      projId: recordId,
                    })}`)}
                    fullWidth

                  >
                    編集
                  </Button>

                </Grid>}

            </Grid>
          </OutlinedDiv>}
        {!custGroupId && <EmptyBox >
          顧客
        </EmptyBox>}
      </Grid>
    </>
  );
};