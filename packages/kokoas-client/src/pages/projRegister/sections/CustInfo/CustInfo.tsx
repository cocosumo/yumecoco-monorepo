import { Button, Grid } from '@mui/material';
import { ComponentProps, useMemo } from 'react';
import {  OutlinedDiv } from '../../../../components/ui/containers';
import { PageSubTitle } from '../../../../components/ui/labels/';
import EditIcon from '@mui/icons-material/Edit';
import {  useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { pages } from '../../../Router';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { generateParams } from '../../../../helpers/url';
import { Column1 } from './Column1';
import { Column2 } from './Column2';
import { LabeledInfo } from '../../../../components/ui/typographies';
import { AGLabels } from 'types';
import { useCustGroupById, useCustomersByCustGroupId } from 'kokoas-client/src/hooksQuery';

export const CustInfo = () => {

  const { status, values } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  const isReadOnly = (status as TFormStatus ) === 'disabled';

  const {
    custGroupId,
    projId,
  } = values;

  /*
    何をどう表示するか変わると思いますので、
    固まったら、リファクタリングします。

    With react-query, data may be cached reducing api-call overhead even if the user
    navigate between pages.
  */
  const { data: custGroupRecord } = useCustGroupById(custGroupId ?? '');
  const { data: customerRecords } = useCustomersByCustGroupId(custGroupId);

  const {
    storeName,
  } = custGroupRecord ?? {};

  const flatCustInfo = useMemo(
    () => customerRecords
      ?.reduce((acc, cur) => {

        acc.custNames.push(cur.fullName.value);
        acc.custNamesReading.push(cur.fullNameReading.value);
        acc.custIds.push(cur.uuid.value.split('-').at(-1) || cur.uuid.value);
        return acc;
      }, {
        custIds: [] as string[],
        custNames: [] as string[],
        custNamesReading: [] as string[],
      }),
    [customerRecords],
  );

  const mainCust = useMemo(
    () => {
      const mainCustRecord = customerRecords?.[0];
      const {
        postalCode,
        address1,
        address2,
      } = mainCustRecord || {};

      return ({
        address:  `〒${postalCode?.value} ${address1?.value}${address2?.value}`,
        contactTuples: mainCustRecord
          ?.contacts
          .value
          .filter(({ value: { contactValue } }) => !!contactValue.value)
          .map(({ value: {
            contactType,
            contactValue,
            relation,
          } }) => ([contactType.value, [contactValue.value, relation.value].join(', ')])) ?? [],
      }) ;
    }
    ,
    [customerRecords],
  );

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
      <Grid item xs={12}>

        {custGroupId &&
          <OutlinedDiv label='参照結果'>
            <Grid container spacing={2} justifyContent="center"
              p={4}
            >
              <Column1
                custDetail={{
                  custNames: flatCustInfo?.custNames.join(', ') || '',
                  custNamesReading: flatCustInfo?.custNamesReading.join(', ') || '',
                  address: mainCust.address,
                  contactTuples: mainCust.contactTuples,
                }}
              />

              <Column2
                adminInfo={{
                  custGroupId: custGroupId.split('-').at(-1) || custGroupId,
                  customerIds: flatCustInfo?.custIds.join(', ') || '',
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
                    onClick={()=>navigate(`${pages.custGroupEditV2}?${generateParams({
                      custGroupId,
                      projId,
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