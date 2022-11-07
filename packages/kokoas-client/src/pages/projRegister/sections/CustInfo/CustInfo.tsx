import { Button, Grid } from '@mui/material';
import { ComponentProps } from 'react';
import {  OutlinedDiv } from '../../../../components/ui/containers';
import { PageSubTitle } from '../../../../components/ui/labels/';
import EditIcon from '@mui/icons-material/Edit';
import {  useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { TypeOfForm, getFieldName } from '../../form';
import { CustomerInstance } from '../../../customer/register/form';
import { pages } from '../../../Router';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { generateParams } from '../../../../helpers/url';
import { Column1 } from './Column1';
import { Column2 } from './Column2';
import { LabeledInfo } from '../../../../components/ui/typographies';
import { AGLabels } from 'types';
import { SearchCustGroup } from 'kokoas-client/src/components/ui/textfield/SearchCustGroup';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useConfirmDialog } from 'kokoas-client/src/hooks';
import { ContentWarning } from 'kokoas-client/src/components/ui/dialogs/ContentWarning';



export const CustInfo = () => {

  const { status, values, dirty } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();
  const { setDialogState } = useConfirmDialog();

  const isReadOnly = (status as TFormStatus ) === 'disabled';

  const {
    custGroupId,
    recordId,
  } = values;

  const { data: custGroupRecord } = useCustGroupById(custGroupId ?? '');

  const {
    members,
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

  /* 工事名を生成する */
  /*   useEffect(()=>{
    setValues(prev => ({
      ...prev,
      projName: `${prev.custName ?? '--'}様邸 ${projTypeName ?? '--'}`,
    }));
  }, [projTypeName, setValues]); */

  const refactoredAgents = custGroupRecord?.agents
    .value
    .reduce((accu, { id, value: { agentType, employeeName } })=>{
      const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];

      const numberedLabel = `${rawLabel ?? '担当者'}1`;

      const isExist = accu.some(item => item.label === numberedLabel);
      const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;
      return [...accu, { key: id, label: resolvedLabel, info: employeeName.value }];
    }, [] as Array<ComponentProps<typeof LabeledInfo> & { key: string }>) ?? [];


  const navigateToCustGroup = (newCustGroupId: string) => {
    navigate(`${pages.projEdit}?${generateParams({
      custGroupId: newCustGroupId,
    })}`);
  };

  return (
    <>
      <Grid item xs={12} md={4} >
        <SearchCustGroup
          value={custGroupId ? {
            id: custGroupId,
            name: customerName?.value || '',
            record: custGroupRecord,
          } : undefined}
          onChange={(_, val) => {
            const { id: newCustGroupId } = val || {};
            if (newCustGroupId ) {
              if (dirty) {
                setDialogState({
                  open: true,
                  title: '動作確認',
                  content: <ContentWarning content={'顧客を変更すると工事情報がリセットされます。'} />,
                  withNo: true,
                  withYes: true,
                  yesText: 'OK',
                  noText: 'キャンセル',
                  handleYes: () => {
                    navigateToCustGroup(newCustGroupId);
                  },
                });
              } else {
                navigateToCustGroup(newCustGroupId);
              }
            }
          }}
          inputProps={{
            label: 'お客検索',
            name: getFieldName('custGroupId'),
          }}
        />
      </Grid>
      <PageSubTitle label="顧客情報" />
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