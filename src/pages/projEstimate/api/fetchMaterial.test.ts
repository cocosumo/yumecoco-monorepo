import { fetchMajorItems } from './fetchMaterials';

describe('Get Materials API', () => {
  it('should be able to get MajorItems', async ()=>{
    const  result = await fetchMajorItems();
    expect(result).toMatchSnapshot();
  });
});