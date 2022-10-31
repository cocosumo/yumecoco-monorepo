import { Collapse, Stack  } from '@mui/material';
import { PageSubTitle } from '../../../../../../components/ui/labels';
import { LabeledDetail } from '../../../../../../components/ui/typographies/LabeledDetail';
import { AGLabels, EmployeeType } from '../../../../../../types/commonTypes';


export const DTCustomer = (props: {
  record?: CustomerGroupTypes.SavedData,
  loading: boolean,
}) => {
  const { record, loading } = props;


  // Customer group record
  const {
    agents,
    storeName,
    members,
    custType,
    projects } = record ?? {};


  const groupedCustAgents = agents?.value.reduce((accu, curr) => {
    const { value: {
      agentType,
      employeeName,
    } } = curr;

    return { [agentType.value]: [...accu[agentType.value] ??  [], employeeName.value] };

  }, {} as Record<string, string[]>);

  return (
    <Collapse in={!loading}>
      <Stack spacing={2} mb={2}>
        <LabeledDetail label='種別' value={custType?.value} />
      </Stack>

      {
        members?.value.map(({
          id, value : {
            customerName,
            postal,
            address1,
            address2,
            customerId,
            dump,
          },
        }, idx) => {

          const {
            fullName,
            fullNameReading,
            birthYear,
            birthMonth,
            birthDay,
            isSameAsMain,
            gender,
            contacts,
          } = JSON.parse(dump.value || 'null') as CustomerTypes.SavedData ?? {};

          const resolveAddress = (postal.value || address1.value || address2.value) ? `${postal.value}  ${address1.value}${address2.value}` : '';
          const resolveBirthDate = [[birthYear.value, '年'], [birthMonth.value, '月'], [birthDay.value, '日']]
            .filter(([value]) => value )
            .map(([value, suffix]) => `${value}${suffix}`).join('');

          const resolvedIsSameAddress = Boolean(+isSameAsMain.value);
          return (
            <Stack key={id} spacing={1} mb={2}>


              <PageSubTitle label={`契約者 ${idx + 1} `} />
              <LabeledDetail label='顧客番号' value={customerId.value} />
              <LabeledDetail label='氏名' value={customerName.value ?? fullName.value} />
              <LabeledDetail label='氏名フリガナ' value={fullNameReading.value} />
              <LabeledDetail label='性別' value={gender.value} />
              <LabeledDetail label='誕生日' value={resolveBirthDate} />
              {resolvedIsSameAddress && <LabeledDetail label='住所' value={'契約者１と同じ'} /> }
              {!resolvedIsSameAddress &&
              <>
                <LabeledDetail label='住所' value={resolveAddress} />
                {contacts?.value
                  ?.filter(({ value: { contactValue } }) => !!contactValue.value)
                  ?.map(({
                    id: contactRowId,
                    value: {
                      contactType,
                      contactValue,
                      relation,
                    },
                  }) => {
                    return  (
                      <LabeledDetail
                        key={contactRowId}
                        label={contactType.value === 'tel' ? '電話番号' : 'メール'}
                        value={`${contactValue.value}, ${relation.value}`}
                      />);
                  })}

              </>}

            </Stack>
          );
        })
      }

      <Stack spacing={2}>
        <PageSubTitle label={'担当情報'} />
        <LabeledDetail label='店舗名' value={storeName?.value ?? '店舗無し。管理者に連絡ください。'} />


        {
          Object.entries(groupedCustAgents ?? {})
            .map(([key, value]) => (
              <LabeledDetail
                key={key}
                label={AGLabels[key as EmployeeType] ?? '担当者'}
                value={value.filter(Boolean).join(', ')}
              />))
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