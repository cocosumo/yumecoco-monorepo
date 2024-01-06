import { buildingTypesAndpad, projectTypesAndpad, SaveProjectData, SaveProjectParams, storeMap } from 'api-andpad';
import { getCustGroupById, getCustomersByIds, getProjById } from 'api-kintone';
import { getAddressByPostal } from 'api-kintone/src/postal/getAddressByPostal';
import { bestStringMatch } from 'kokoas-client/src/lib';
import { TAgents, TContact } from 'types';
import { getPostalByAddress } from '../others';


const resolvePostalByAddress = async (postal: string | undefined, address: string) => {
  let parsedProjPostal = postal;

  if (!parsedProjPostal) {
    parsedProjPostal = await getPostalByAddress(address);
  }

  console.log('address', address, parsedProjPostal);


  return parsedProjPostal;

};

export const convertProjToAndpad = async (projId: string) => {

  const [projRec] = await Promise.all([
    getProjById(projId),
  ]);
  if (!projRec) throw new Error('工事情報の取得が失敗しました。');

  const custGroupRec = await getCustGroupById(projRec?.custGroupId.value);
  if (!custGroupRec) throw new Error('顧客グループ情報の取得が失敗しました。');

  const {
    agents: projAgents,

  } = projRec;

  const {
    members,
    agents,
  } = custGroupRec;

  const firstCustId = members.value[0].value.custId.value;
  const firstCust = (await getCustomersByIds([firstCustId]))[0];

  const cocoAGIds = agents.value
    .filter((row) => (row.value.agentType.value as TAgents) === 'cocoAG')
    .map((row) => row.value.employeeId.value);

  const cocoAGConstIds = projAgents.value.map((row) => row.value.agentId.value);

  if (!firstCust) throw new Error('顧客情報の取得が失敗しました。');

  const parsedProjPostal = await resolvePostalByAddress(
    projRec?.postal.value, 
    projRec.address1.value + projRec.address2.value,
  );


  const parsedCustPostal = await resolvePostalByAddress(
    firstCust?.postalCode?.value,
    firstCust?.address1?.value + firstCust?.address2?.value,
  );


  const {
    pref: projPrefecture,
  } = await getAddressByPostal(parsedProjPostal) ?? {};

  const {
    pref: custPrefecture,
  } = await getAddressByPostal(parsedCustPostal) ?? {};

  //if (!projPrefecture) throw new Error('物件の都道府県の取得が失敗しました。');
  //if (!custPrefecture) throw new Error('顧客の都道府県の取得が失敗しました。');


  const firstAgent = custGroupRec
    .agents
    .value
    .find((row) => (row.value.agentType.value as TAgents) === 'cocoAG')
    ?.value;


  const [firstCustTel1, firstCustTel2] = firstCust.contacts.value.filter((row) => (row.value.contactType.value as TContact) === 'tel');
  const firstCustEmail = firstCust.contacts.value.find((row) => (row.value.contactType.value as TContact) === 'email');

  const storeName = storeMap[custGroupRec.storeName.value];
  if (!storeName) throw new Error(`Andpadの店舗名の取得が失敗しました。${storeName}`);

  const saveResult: SaveProjectData = {
    '顧客管理ID': custGroupRec.uuid.value,
    '顧客名': firstCust.fullName.value,
    '顧客名（カナ）': firstCust.fullNameReading?.value || '',
    '顧客郵便番号': parsedCustPostal || '',
    '顧客現住所': [firstCust.address1?.value.trim(), firstCust.address2?.value.trim()].filter(Boolean).join(',') || '',
    '顧客担当者名': firstAgent?.employeeName.value,
    '顧客電話番号1': firstCustTel1.value.contactValue.value,
    '顧客電話番号2': firstCustTel2.value.contactValue.value,
    '顧客メールアドレス': firstCustEmail?.value.contactValue.value,

    '物件管理ID': projRec.uuid.value,
    '物件種別': bestStringMatch(projRec.buildingType.value, buildingTypesAndpad, { valueIfNoMatch: 'その他' }),
    '物件名': `${firstCust.fullName.value}様邸`,
    '物件住所種別': '新しい住所を入力する',
    '物件郵便番号': parsedProjPostal || '',
    '物件都道府県': projPrefecture?.value || '', 
    // remove 都道府県 from address1 as andpad will add it automatically
    '物件住所': `${projRec.address1.value.replace(projPrefecture?.value || '', '')}${projRec.address2?.value}`,

    '案件管理ID': projRec.uuid.value,
    '案件名': `ここすも${storeName}　${projRec.projName.value}`,
    '案件種別': projRec.projTypeName.value === '新築工事' ? '新築' : 'リフォーム',

    // 見積との依存関係をなくすことにより、一旦コメントアウトします。
    //'契約日(さく実績)': estRec.contractDate.value ? format(parseISO(estRec.contractDate.value), 'yyyy/MM/dd') : '',

    'ラベル:工事内容': bestStringMatch(projRec.projTypeName.value, projectTypesAndpad, { valueIfNoMatch: 'その他' }),
    'ラベル:店舗': storeName,
    '顧客都道府県': custPrefecture?.value || '',
  };

  const dataToBeSaved : SaveProjectParams = {
    projData: saveResult,
    members: [...new Set([...cocoAGIds, ...cocoAGConstIds])],
  };

  

  return dataToBeSaved;

};