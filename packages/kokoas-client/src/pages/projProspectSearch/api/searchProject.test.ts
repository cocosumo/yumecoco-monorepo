import { searchProject } from './searchProject';

describe('Prospect Search', ()=>{
  it('prospect', async ()=>{
    const result = await searchProject({
      mainSearch: 'Lorenz',

    });

    console.log(result.length);

    expect(result).toMatchSnapshot();
  }, 30000);
});