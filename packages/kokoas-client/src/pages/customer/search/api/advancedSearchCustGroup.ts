import { getAllCustGroups } from 'api-kintone';
import { getCustGroupKey, KFlatCustGroup, RecordStatus } from 'types';



export const resolveRecordStatusQuery = (statuses?: RecordStatus[]) => {

  if (!statuses || !statuses.length) return [];

  const queryStr = (s: RecordStatus) => {
    switch (s) {
      case '情報登録のみ':
        return  `${getCustGroupKey('projectCount')} = "0" or ${'projectCount' as KFlatCustGroup} = ""`;
      case '追客中':
        return  `${getCustGroupKey('projectCount')} > 0`;
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



export const advancedSearchCustGroup = async (
  params : any,
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

  return getAllCustGroups({
    query,
    orderBy:['更新日時', 'desc'],
  });

};