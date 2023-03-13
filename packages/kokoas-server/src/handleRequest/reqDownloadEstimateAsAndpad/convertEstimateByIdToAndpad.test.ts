import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';


describe('convertEstimateByIdToAndpad', () => {
  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateByIdToAndpad('invalidId'))
      .rejects.toThrow();
  });

  
});