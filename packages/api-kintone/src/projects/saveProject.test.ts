import { getCustGroupById } from './../custgroups';
import { getProjById } from './getProjById';
import { saveProject } from './saveProject';
import omit from 'lodash/omit';
import { getProjsByCustGroupId } from './getProjsByCustGroupId';

describe('save/update project', () => {
  it('should save project', async () => {
    const testProjId = '123';
    /* 
      TODO: Need to improve this. Test should be deterministic.
      We will make a data factory for mock data if given more time ~ras.
    */
    const rawProjRecord = await getProjById(testProjId);

    const projRecord = omit(rawProjRecord, ['$id', 'レコード番号', '更新者', '作成者', '作成日時', '更新日時']);
    console.log('Retrieved', projRecord.$revision, projRecord);

    const projRevision = +projRecord.$revision.value;
    
    /* Start test */
    const result = await saveProject({
      record: projRecord,
      projId: testProjId,
    });

    /* should be the same id. */
    expect(result.id).toEqual(testProjId);
    /* Revision must have incremented. */
    expect(+projRevision + 1).toEqual(+result.revision);

  });

  it('should match the number of projects in custGroup.projectCount', async () => {
    const testData = '183'; // 顧客番号

    const [
      custGroupRec,
      projRecs,
    ] = await Promise.all([
      getCustGroupById(testData),
      getProjsByCustGroupId(testData),
    ]);

    const {
      projectCount,
    } = custGroupRec;

    expect(projRecs.length).toEqual(+projectCount.value);

  });
});