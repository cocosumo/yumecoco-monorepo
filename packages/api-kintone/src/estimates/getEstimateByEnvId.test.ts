import { getEstimateByEnvId } from './getEstimateByEnvId';

describe('getEstimateByEnvId', () => {
  it('should retrieve estimate by envelope id', async () => {
    const envId = 'f664e1ff-7eb2-4621-8d95-0129255b0b3b'; // 存在しているものに設定する

    const record = await getEstimateByEnvId(envId);
    console.log(record);

    expect(record.envId.value).toEqual(envId);
  });
});