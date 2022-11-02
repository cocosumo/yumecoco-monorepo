import { AppIds } from 'config';
import { getCustGroupKey, KFlatCustGroup, TEnvelopeStatus } from 'types';
import { KintoneRecord } from '../../../../api/kintone';
import { RecordStatus } from '../../../../config/formValues';



export const resolveRecordStatusQuery = (statuses?: RecordStatus[]) => {

  if (!statuses || !statuses.length) return [];

  const queryStr = (s: RecordStatus) => {
    switch (s) {
      case '情報登録のみ':
        return  `${getCustGroupKey('projectCount')} = "0" or ${'projectCount' as KFlatCustGroup} = ""`;
      case '契約申請中':
        return `${getCustGroupKey('envStatus')} like "${((k: TEnvelopeStatus)=>k)('sent')}"`;
      case '契約済':
        return `${getCustGroupKey('envStatus')} like "${((k: TEnvelopeStatus)=>k)('completed')}"`;

      case '追客中':
        return  `${getCustGroupKey('projectCount')} > 0`;
      case '中止':
        return `${getCustGroupKey('cancelStatus')} like "中止"`;
      case '他決':
        return `${getCustGroupKey('cancelStatus')} like "他決"`;
      case '削除 (工事)':
        return `${getCustGroupKey('cancelStatus')} like "削除"`;
      case '削除':
        return `${getCustGroupKey('isDeleted')} = "1"`;

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
    ...(custType ? [`${'custType' as KFlatCustGroup} in ("${custType}")`] : []),
    ...(storeId ? [`${'storeId' as KFlatCustGroup} = "${storeId}"`] : []),
    ...(yumeAG ? [`${'employeeId' as KFlatCustGroup} in ("${yumeAG}")`] : []),
    ...(cocoAG ? [`${'employeeId' as KFlatCustGroup} in ("${cocoAG}")`] : []),
    ...(cocoConst ? [`${'employeeId' as KFlatCustGroup} in ("${cocoConst}")`] : []),
    ...(custName ? [`${'customerName' as KFlatCustGroup} like "${custName}"`] : []),
    ...(phone ? [`${'dump' as KFlatCustGroup} like "${phone}"`] : []),
    ...(email ? [`${'dump' as KFlatCustGroup} like "${email}"`] : []),
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
        ] as KFlatCustGroup[])
          .map(item => `${item} like "${address}"`)
          .join(' or ')
      })`] : []),
  ];

  const query = queryArr
    .filter((arr) => arr.length)
    .join(' and ');



  return KintoneRecord.getAllRecords({
    app: AppIds.custGroups,
    condition: query ?? undefined,
    orderBy:  `${'更新日時' as KFlatCustGroup} desc`,
  });

};