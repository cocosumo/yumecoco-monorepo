import { searchProjects } from './searchProjects';

test('searchProjects', async ()=>{

  const result = await searchProjects('Lorenz');

  expect(result).toMatchSnapshot();

});