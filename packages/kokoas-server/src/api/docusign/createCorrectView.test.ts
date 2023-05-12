import { createCorrectView } from './createCorrectView';

describe('Create sender', () => {

  it('should generate link correct view', async () => {
    const result = await createCorrectView('dcdc8c8c-6d3b-413e-8498-29fa034c6e87')
      .catch((err) => {
        console.log('err', err);
      });
    console.log('result', result);

    expect(result).toHaveProperty('url');
  });
});