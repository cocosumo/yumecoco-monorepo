import { getProjTypeByLabel } from './GET';

describe('Get wrapper for projectTypes', ()=>{
  it('Should get projectType by name', async ()=>{
    const result = await getProjTypeByLabel('蓄電池');

    expect(result).toMatchSnapshot();
  });
});