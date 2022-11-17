import { getInVoiceByProjId } from './getInVoiceByProjId';

describe('Estimate', () => {
  it('should get estimate by id', async () => {

    const record = await getInVoiceByProjId('75');

    console.log(record);

    expect(record).toHaveProperty('$id');
  }, 10000 );
});