import { KintoneRecord, KintoneClient, APPIDS } from '../../../api/kintone';
import { getCustGroupByProjectId } from './getCustGroupByProjectId';


interface UpdateRequest {
  method: 'PUT',
  api: '/k/v1/record.json',
  payload: {
    app: string,
    id: string,
    record: Partial<CustomerGroupTypes.SavedData>
  }
}

/**
 * The project id might exist in someother custGroup,
 * so this resolves request to clean up before saving.
 * @param projectId
 * @returns
 */
const resolveDeleteRequest = async (projectId: string) => {
  return (await getCustGroupByProjectId(projectId))
    .map(({ $id, $revision, projects }) => {
      return {
        method: 'PUT',
        api: '/k/v1/record.json',
        payload: {
          app: APPIDS.custGroup.toString(),
          id: $id.value,
          revision: $revision.value,
          record: {
            projects: {
              type: 'SUBTABLE',
              value: projects.value.filter(item => item.value.projId.value !== projectId),
            },
          },
        },
      };
    });
};

/**
 * Get custgroup record, then add the projectId.
 * This keep the projects subtable updated in customer groups app.
 * API calls: 2
 * @param projectId
 * @param custGroupId
 * @param cocoConst Agent names
 * @returns
 */
const resolveSaveRequest = async (projectId: string, custGroupId: string, cocoConst: string[]) => {
  const { projects } = await KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
  }).then(resp => resp.record as unknown as CustomerGroupTypes.SavedData);

  const newProjects = projects.value
    .filter(item => item.value.projId.value !== projectId)
    .concat([{
      id: '',
      value: {

        projId: { value: projectId },
        projName: { value: 'auto' },
        cocoConst1: { value: cocoConst[0] },
        cocoConst2: { value: cocoConst[1] },
        cocoConst1Name : { value: 'auto' },
        cocoConst2Name : { value: 'auto' },
        kariAddress :  { value: 'auto' },
        projectAddress1:  { value: 'auto' },
        projectAddress2:  { value: 'auto' },
        projectPostal:  { value: 'auto' },
        status: { value: 'auto' },
        cancelStatus: { value: 'auto' },
        envStatus: { value: 'auto' },
      },
    }]);

  return [{
    method: 'PUT',
    api: '/k/v1/record.json',
    payload: {
      app: APPIDS.custGroup.toString(),
      id: custGroupId,
      record: {
        projects: {
          type: 'SUBTABLE',
          value: newProjects,
        },
        projectCount: { value: newProjects.length.toString() },
      },
    },
  },
  ] as UpdateRequest[];
};

/**
 * Transaction to delete projectId on other customerGroups
 * prior to saving the projectId on designated customerGroup.
 *
 * Current purpose of saving the projectId in customerGroup is
 * to minimize code overhead when querying number of projects per customerGroup
 *
 * Will rollback in case of failure.
 *
 * @param projectId
 * @param custGroupId
 * @returns
 */
export const saveProjectToCustGroup = async (projectId: string, custGroupId: string, cocoConst: string[]) => {

  if (!custGroupId) throw new Error('No custgroup id supplied in saveConstructionData.');


  const requests : Parameters<typeof KintoneClient.bulkRequest>[0]['requests'] = [
    ...await resolveDeleteRequest(projectId),
    ...await resolveSaveRequest(projectId, custGroupId, cocoConst),
  ];

  if (requests.length) {
    return KintoneClient.bulkRequest({
      requests,
    });
  } else {
    throw new Error('Bulk request is empty. ' + requests);
  }

};