import { getOrderByProjId } from './getOrderByProjId';
import { describe, it, expect } from '@jest/globals';


describe('getOrderById の統合テスト', () => {
  it('有効な projId に対してプロジェクトデータを返すべき', async () => {
    const projId = 'anken-test-only2';

    const projectData = await getOrderByProjId(projId);

    expect(projectData).toHaveProperty('案件管理ID', projId);

  });

  it('無効な projId に対してエラーを投げるべき', async () => {
    const projId = 'invalid-project-id';

    await expect(getOrderByProjId(projId)).rejects.toThrow();
  });
});