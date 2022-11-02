import { ICustgroups, KCustGroupMembers } from 'types';
import { APPIDS, KintoneRecord } from '../../../api/kintone';


export type SearchItems = Array<{
  projName: string,
  postal: string,
  address1: string,
  address2: string,
}>;

export const getProjectsByCustGroupId = async (custGroupId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
  }).then(resp => {
    const { members } = resp.record as unknown as ICustgroups;

    const queryByName = `${ 'customerName' as KCustGroupMembers } in (${members.value
      .map(({ value: { customerName } }) => `"${customerName.value}"`)
      .join(',')})`;

    return KintoneRecord.getAllRecords({
      app: APPIDS.custGroup,
      condition:
        queryByName,
    });

  })
    .then(resp => (
      resp as unknown as ICustgroups[]
    )
      // Get non-empty projects
      .filter(({ projects }) => projects.value
        .filter(({ value: { projId } }) => projId.value)
        .length,
      )
      .reduce((accu, curr)=>{
        const projects: SearchItems = curr.projects.value
          .map(({ value: { projName, projectPostal, projectAddress1, projectAddress2 } }) => ({
            projName: projName.value,
            postal: projectPostal.value,
            address1: projectAddress1.value,
            address2: projectAddress2.value,
          } ) );
        return accu.concat(projects);
      }, [] as SearchItems),
    )
    .catch(err => {
      throw new Error('Error occured! ' + err.message);
    } );
};