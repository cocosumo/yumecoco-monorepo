import { convertEstimateByIdToAndpad } from './convertEstimateByIdToAndpad';


describe('convertEstimateByIdToAndpad', () => {
  const testEstimateId = 'fc8f798a-a73f-4447-b4bb-99d51da2f198';

  it('見積もりIDが見つからない場合、エラーが発生します', async () => {
    await expect(convertEstimateByIdToAndpad('invalidId'))
      .rejects.toThrow();
  });

  it('見積もりIDが見つかる場合、エクセルファイルが返されます', async () => {
    const result = await convertEstimateByIdToAndpad(testEstimateId);

    // excel to base64
    const base64 = Buffer.from(await result.xlsx.writeBuffer())
      .toString('base64');

    console.log('base64: ', base64);
    expect(base64).toBeTruthy();
  });
  
});