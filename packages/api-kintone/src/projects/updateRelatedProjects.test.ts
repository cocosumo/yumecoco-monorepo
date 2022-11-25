import { updateRelatedProjects } from './updateRelatedProjects';

describe('updateRelatedProjects', () => {
  it('should update related projId', async () => {
    const testId = '123'; // 存在しているテスト用の工事番号


    const result = await updateRelatedProjects(testId);

    /* TODO: Retrieved resulting records and test if it matches the input */
    expect(result).toBeDefined();


  });


});