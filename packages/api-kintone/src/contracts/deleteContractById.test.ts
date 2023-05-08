import { deleteContractById } from './deleteContractById';




describe('deleteContractById', () => {
  it('should succesfully deleted record', async () => {
    // 未処理の一覧からuuidが取得出来ます。
    // https://rdmuhwtt6gx7.cybozu.com/k/231/?view=5536753&_saved=1
    // TODO: モックデータを作成する。
    const result = await deleteContractById('fe17a8e6-cd39-456d-986c-9259770c2638');
    console.log(result);
    // expect empty object
    expect(result).toEqual({});
  });
});