import { APPIDS, KintoneRecord } from '../config';

export const projectFields :KeyOfProjectDetails[] = [
  '$id', '$revision', 'address1',
  'address2', 'address2', 'agents',
  'buildingType', 'projName',
  'projTypeName', 'projTypeId',
  'custGroupId', 'isAgentConfirmed',
  'isChkAddressKari', 'postal',
];

export const projectProspectFields: KeyOfProjectDetails[] = [
  'rank', '$id', 'schedContractDate',
  'memo', 'planApplicationDate', 'schedContractPrice',
  'estatePurchaseDate',
];

export const getConstDetails = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  });
};

/**
 * Will reorganize code to put specialized api in
 * the directory of the caller.
 * @deprecated
 */
export const getFlatConstDetails = async (recordId: string) => {
  const kintoneRecord = await getConstDetails(recordId);

  return Object.entries(kintoneRecord.record).reduce((acc, [key, val]) => {

    return { ...acc, [key]: val.value };

  }, {});

};

export const getConstRecord = async (id: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id,
  }).then(resp => resp.record as unknown as ProjectDetails.SavedData);
};

export const getConstRecordByIds = async (ids: string[]) => {
  return KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: ids
      .map(id => `${'$id' as keyof ProjectDetails.SavedData} = "${id}"`)
      .join(' or '),
  });
};

/**
 * Get projects by partial search string.
 *
 * @param search Search string
 * @returns
 */
export const searchProjects = async (search: string) => {

  const fieldProjName: KeyOfProjectDetails = 'projName';
  const fields : KeyOfProjectDetails[] = ['projName', '$id' ];

  return KintoneRecord.getRecords({
    app: APPIDS.constructionDetails,
    query: `${fieldProjName} like "${search}"`,
    fields: fields,
    totalCount: true,
  })
    .then(r => r.records as unknown as ProjectDetails.SavedData[]);
};