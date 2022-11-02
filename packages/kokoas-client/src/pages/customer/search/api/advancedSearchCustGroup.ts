import { TEnvelopeStatus } from 'types';
import { KintoneRecord, APPIDS } from '../../../../api/kintone';
import { RecordStatus } from '../../../../config/formValues';

type ProjectKey = Partial<keyof CustomerGroupTypes.SavedData['projects']['value'][0]['value']>;
type AgentsKey = Partial<keyof CustomerGroupTypes.SavedData['agents']['value'][0]['value']>;
type Key = Partial<keyof CustomerGroupTypes.SavedData>;
type CustKey = Partial<keyof CustomerGroupTypes.SavedData['members']['value'][0]['value']>;

type TKeyOfFlatCustGroup = ProjectKey | AgentsKey | Key | CustKey;

const getCGKey = (k: TKeyOfFlatCustGroup) => k;


export const resolveRecordStatusQuery = (statuses?: RecordStatus[]) => {

  if (!statuses || !statuses.length) return [];

  const queryStr = (s: RecordStatus) => {
    switch (s) {
      case '情報登録のみ':
        return  `${getCGKey('projectCount')} = "0" or ${'projectCount' as Key} = ""`;
      case '契約申請中':
        return `${getCGKey('envStatus')} like "${((k: TEnvelopeStatus)=>k)('sent')}"`;
      case '契約済':
        return `${getCGKey('envStatus')} like "${((k: TEnvelopeStatus)=>k)('completed')}"`;

      case '追客中':
        return  `${getCGKey('projectCount')} > 0`;
      case '中止':
        return `${getCGKey('cancelStatus')} like "中止"`;
      case '他決':
        return `${getCGKey('cancelStatus')} like "他決"`;
      case '削除 (工事)':
        return `${getCGKey('cancelStatus')} like "削除"`;
      case '削除':
        return `${getCGKey('isDeleted')} = "1"`;

      default: return undefined;
    }
  };

  const completeQueryStr = statuses.map((item) => {
    return queryStr(item);
  } ).filter(Boolean).join(' or ');

  return `(${completeQueryStr})`;


};

export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
  phone?: string,
  address?: string,
  email?: string,
  yumeAG?: string,
  cocoAG?: string,
  cocoConst?: string,
  custType?: string,
  recordStatus?: RecordStatus[],
}

export const advancedSearchCustGroup = async (
  params : AdvancedSearchCustGroupParam,
) => {
  const {
    storeId,
    custName,
    phone,
    address,
    email, cocoAG, cocoConst, yumeAG,
    custType, recordStatus,
  } = params;



  const queryArr = [
    resolveRecordStatusQuery(recordStatus),
    ...(custType ? [`${'custType' as Key} in ("${custType}")`] : []),
    ...(storeId ? [`${'storeId' as Key} = "${storeId}"`] : []),
    ...(yumeAG ? [`${'employeeId' as AgentsKey} in ("${yumeAG}")`] : []),
    ...(cocoAG ? [`${'employeeId' as AgentsKey} in ("${cocoAG}")`] : []),
    ...(cocoConst ? [`${'employeeId' as AgentsKey} in ("${cocoConst}")`] : []),
    ...(custName ? [`${'customerName' as CustKey} like "${custName}"`] : []),
    ...(phone ? [`${'dump' as CustKey} like "${phone}"`] : []),
    ...(email ? [`${'dump' as CustKey} like "${email}"`] : []),
    ...(address ? [
      `(${
        (['dump',
          'address1',
          'address2',
          'postal',
          'projectAddress1',
          'projectAddress2',
          'kariAddress',
          'projectPostal',
        ] as CustKey[] | ProjectKey[] | CustKey[])
          .map(item => `${item} like "${address}"`)
          .join(' or ')
      })`] : []),
  ];

  const query = queryArr
    .filter((arr) => arr.length)
    .join(' and ');



  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query ?? undefined,
    orderBy:  `${'更新日時' as Key} desc`,
  });

};