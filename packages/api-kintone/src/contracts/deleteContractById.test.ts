import { deleteContractById } from './deleteContractById';

describe('deleteContractById', () => {
  it('should succesfully deleted record', async () => {
    // 未処理の一覧からuuidが取得出来ます。
    // https://rdmuhwtt6gx7.cybozu.com/k/231/?view=5536753&_saved=1
    const result = await deleteContractById('7a3f3eae-e25b-4afb-8f94-e82bc6eba6e6');
    console.log(result);
    // expect empty object
    expect(result).toEqual({});
  });
});