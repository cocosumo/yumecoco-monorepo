import { getOrderByProjId } from './getOrderByProjId';

describe('getOrderByProjId', () => {
  it('ここあすの工事番号でANDPAD案件を取得する', async () => {
    const projId = 'anken-test-only2';
    const result = await getOrderByProjId(projId);

    console.log(JSON.stringify(result, null, 2));
    
    expect(result?.案件管理ID).toBe(projId);
  });
});