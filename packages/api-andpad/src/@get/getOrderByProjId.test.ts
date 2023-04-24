import { getOrderByProjId } from './getOrderByProjId';

describe('getOrderByProjId', () => {
  it('ここあすの工事番号でANDPAD案件を取得する', async () => {
    const projId = 'b9319c5f-6fc6-4115-8534-f505493f83f7';
    const result = await getOrderByProjId(projId);

    console.log(JSON.stringify(result, null, 2));
    
    expect(result?.案件管理ID).toBe(projId);
  });
});