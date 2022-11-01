import { searchProjects } from './GET';

describe('Get wrappers for project records', () => {
  it('should get projects by search string', async ()=>{
    const result = await searchProjects('Lorenz');
    expect(result).toMatchSnapshot();
  }, 5000);
});