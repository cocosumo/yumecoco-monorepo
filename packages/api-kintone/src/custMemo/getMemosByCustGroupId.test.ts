import { getMemosByCustGroupId } from './getMemosByCustGroupId';

describe('getMemosByCustGroupId', () => {
  it('should return memo by existing custgroup id', async () => {
    const testId = '183'; //存在している顧客グループ番号
    const record = await getMemosByCustGroupId(testId);
    console.log(record);
    expect(record).toBeDefined();
  });
});