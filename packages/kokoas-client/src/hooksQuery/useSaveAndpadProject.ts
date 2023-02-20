import { useMutation } from '@tanstack/react-query';
import { TAgents, TContact } from 'types';
import { saveAndpadProject } from '../api/andpad/saveAndpadProject';

import { useCommonOptions } from './useCommonOptions';
import { useCustGroupById } from './useCustGroupById';
import { useCustomersById } from './useCustomersById';
import { useProjById } from './useProjById';
import { buildingTypesAndpad, projectTypesAndpad, storeNamesAndpad } from 'api-andpad';
import { bestStringMatch } from '../lib';
import { useContractByProjId } from './useContractByProjId';



export const useSaveAndpadProject = (projId: string | undefined) => {
  const commonOptions = useCommonOptions();
  const { data: projRec } = useProjById(projId ?? '');
  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value ?? '');
  const { data: estData } = useContractByProjId(projId);

  const firstCustId = custGroupRec?.members.value[0].value.custId.value;

  const { data: firstCust } = useCustomersById(firstCustId);

  console.log(projId, estData);

  return useMutation(
    () => {

      if (!projRec) throw new Error('工事情報の取得が失敗しました。');
      if (!custGroupRec) throw new Error('顧客グループ情報の取得が失敗しました。');
      if (!firstCust) throw new Error('顧客情報の取得が失敗しました。');
      if (!estData) throw new Error('契約の取得が失敗しました。');

      const { record: estRec } = estData;

      const firstAgent = custGroupRec
        .agents
        .value
        .find((row) => (row.value.agentType.value as TAgents) === 'cocoAG')
        ?.value;


      const [firstCustTel1, firstCustTel2] = firstCust.contacts.value.filter((row) => (row.value.contactType.value as TContact) === 'tel');
      const firstCustEmail = firstCust.contacts.value.find((row) => (row.value.contactType.value as TContact) === 'email');

      return saveAndpadProject({
        '顧客管理ID': custGroupRec.uuid.value,
        '顧客名': firstCust.fullName.value,
        '顧客名（カナ）': firstCust.fullNameReading.value,
        '顧客郵便番号': firstCust.postalCode.value,
        '顧客現住所': [firstCust.address1.value, firstCust.address2.value].join(','),
        '顧客担当者名': firstAgent?.employeeName.value,
        '顧客電話番号1': firstCustTel1.value.contactValue.value,
        '顧客電話番号2': firstCustTel2.value.contactValue.value,
        '顧客メールアドレス': firstCustEmail?.value.contactValue.value,
        '物件管理ID': projRec.uuid.value,
        '物件種別': bestStringMatch(projRec.buildingType.value, buildingTypesAndpad, { valueIfNoMatch: 'その他' }),
        '物件名': `${firstCust.fullName.value}様邸`,
        '物件住所種別': '新しい住所を入力する',
        '物件郵便番号': projRec.postal.value,
        '物件住所': `${projRec.address1.value}${projRec.address2.value}`,
        '案件管理ID': projRec.uuid.value,
        '案件名': `${custGroupRec.storeName.value}　${projRec.projName.value}`,
        '案件種別': projRec.projTypeName.value === '新築工事' ? '新築' : 'リフォーム',
        '案件フロー': '契約前',
        '契約日(実績)': estRec.contractDate.value,
        'ラベル:工事内容': bestStringMatch(projRec.projTypeName.value, projectTypesAndpad, { valueIfNoMatch: 'その他' }),
        'ラベル:店舗': bestStringMatch(custGroupRec.storeName.value, storeNamesAndpad, { ignore: '店' }),

        //'案件都道府県': z.string().optional(),
        //'物件都道府県': z.string().optional(),
      });
    },
    {
      ...commonOptions,
    },
  );
};