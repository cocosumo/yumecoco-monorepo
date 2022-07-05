import { sendContract } from './sendContract';

describe('sendContract', () => {
  it('should send contract', async () => {
    const result = await sendContract('111', '');

    expect(result).toMatchSnapshot();
  });
});