import { Collapse, Stack  } from '@mui/material';
import { CustomerInstance } from '../../../register/form';
import { PageSubTitle } from '../../../../../components/ui/labels';
import { LabeledDetail } from './LabeledDetail';
import { AGLabels, EmployeeType } from '../../../../../api/kintone/employees/GET';


export const DTCustomer = (props: {
  record?: CustomerGroupTypes.SavedData,
  loading: boolean,
}) => {
  const { record, loading } = props;


  // Customer group record
  const { agents, storeName, members, projects } = record ?? {};


  const groupedCustAgents = agents?.value.reduce((accu, curr) => {
    const { value: {
      agentType,
      employeeName,
    } } = curr;

    return { [agentType.value]: [...accu[agentType.value] ??  [], employeeName.value] };

  }, {} as Record<string, string[]>);

  return (
    <Collapse in={!loading}>
      {
        members?.value.map(({
          id, value : {
            customerName,
            postal, address1, address2,
            customerId,
            dump,
          },
        }, idx) => {



          const {
            custName,
            custNameReading,
            birthYear, birthMonth, birthDay,
            email, emailRel, gender,
            phone1, phone1Rel,
            phone2, phone2Rel,
          } = JSON.parse(dump.value || 'null') as CustomerInstance ?? {};

          const resolveAddress = (postal.value || address1.value || address2.value) ? `${postal.value}  ${address1.value}${address2.value}` : '';
          const resolveBirthDate = [[birthYear, '年'], [birthMonth, '月'], [birthDay, '日']]
            .filter(([value]) => value )
            .map(([value, suffix]) => `${value}${suffix}`).join('');

          return (
            <Stack key={id} spacing={1} mb={2}>
              <PageSubTitle  label={`契約者 ${idx + 1} `} />
              <LabeledDetail label='顧客番号' value={customerId.value}/>
              <LabeledDetail label='氏名' value={customerName.value ?? custName}/>
              <LabeledDetail label='氏名フリガナ' value={custNameReading}/>
              <LabeledDetail label='性別' value={gender}/>
              <LabeledDetail label='誕生日' value={resolveBirthDate}/>
              <LabeledDetail label='住所' value={resolveAddress}/>
              <LabeledDetail label='電話番号1' value={[phone1, phone1Rel].filter(Boolean).join(', ')}/>
              <LabeledDetail label='電話番号2' value={[phone2, phone2Rel].filter(Boolean).join(', ')}/>
              <LabeledDetail label='メアド' value={[email, emailRel].filter(Boolean).join(', ')}/>
            </Stack>
          );
        })
      }

      <Stack spacing={2}>
        <PageSubTitle  label={'担当情報'} />
        <LabeledDetail label='店舗名' value={storeName?.value ?? '店舗無し。管理者に連絡ください。'}/>


        {
          Object.entries(groupedCustAgents ?? {})
            .map(([key, value]) => <LabeledDetail
                key={key}
                label={AGLabels[key as EmployeeType] ?? '担当者'}
                value={value.filter(Boolean).join(', ')}
              />)
        }

        {projects?.value.map(({
          id,
          value: {
            cocoConst1Name,
            cocoConst2Name,
          },
        }) => {
          return (
            <LabeledDetail
              key={id}
              label={AGLabels.cocoConst}
              value={[cocoConst1Name.value, cocoConst2Name.value].filter(Boolean).join(', ')}
            />
          );
        })}



      </Stack>

    </Collapse>
  );
};