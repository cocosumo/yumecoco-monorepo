
import { ICustgroups } from 'types';
import { AppIds } from 'config';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { isBrowser } from 'kokoas-client/src/helpers/utils';
import { getProjsByCustGroupId } from './getProjsByCustGroupId';



interface UpdateRequest {
  method: 'PUT',
  api: '/k/v1/record.json',
  payload: {
    app: string,
    id: string,
    record: Partial<ICustgroups>
  }
}


/**
 * Get custgroup record, then add the projectId.
 * This keep the projects subtable updated in customer groups app.
 * 
 * 
 * @param projectId
 * @param custGroupId
 * @param cocoConst Agent names
 * @returns
 */
const resolveSaveRequest = async (
  custGroupId: string, 
) => {

  const projRecs = await getProjsByCustGroupId(custGroupId);


  return [{
    method: 'PUT',
    api: '/k/v1/record.json',
    payload: {
      app: AppIds.custGroups.toString(),
      id: custGroupId,
      record: {
        projects: {
          type: 'SUBTABLE',
          value: projRecs.map(({
            $id,
            agents,
          }) => {
            const [
              cocoConst1,
              cocoConst2,
            ] = agents.value.map(({ value: { agentId } }) => agentId.value );

            return {
              id: '',
              value: {
                projId: { value: $id.value },
                cocoConst1: { value: cocoConst1 },
                cocoConst2: { value: cocoConst2 },
              },
            };
          }),
        },
        projectCount: { value: projRecs.length.toString() },
      },
    },
  },
  ] as UpdateRequest[];
};

/**
 *
 * Current purpose of saving the projectId in customerGroup is
 * to minimize code overhead when querying number of projects per customerGroup
 *
 * Using bulk-request api allow rollback in case of failure.
 *
 * @param projectId
 * @param custGroupId
 * 
 * @todo rollback feature of bulk request may not be needed
 * so convert this to regular update api.
 * Needs more direction on this.
 */
export const saveProjToCustGroup = async (
  {
    custGroupId,
  }:{
    custGroupId: string, 
  },

) => {

  if (!custGroupId) throw new Error('No custgroup id supplied in saveConstructionData.');

  /******************
   * Kintone's oAuth2 doesn't have access to 
   * "POST:/k/v1/bulkRequest.json so use tokens 
   * 参考：https://developer.cybozu.io/hc/ja/articles/360015955171
   *****************/ 
  const KintoneClient = new KintoneRestAPIClient({
    baseUrl: process.env.KT_BASE_URL,
    auth: isBrowser() ? undefined : {
      apiToken: [
        process.env.KT_CUST_GROUP,
        process.env.KT_PROJECT,
        process.env.KT_EMPLOYEE,
      ],
    },
  });


  const requests : Parameters<typeof KintoneClient.bulkRequest>[0]['requests'] = [
    ...await resolveSaveRequest(custGroupId),
  ];


  if (requests.length) {
    return KintoneClient.bulkRequest({
      requests,
    });
  } else {
    throw new Error('Bulk request is empty. ' + requests);
  }

};