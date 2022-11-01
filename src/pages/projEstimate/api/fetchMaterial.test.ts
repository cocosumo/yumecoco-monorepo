import { fetchMajorItems, fetchMaterials, fetchMiddleItems } from './fetchMaterials';

describe('Get Materials API', () => {
  it('should be able to get MajorItems', async ()=>{
    const  result = await fetchMajorItems();
    expect(result).toMatchSnapshot();
  });

  it('should be able to get MiddleItems', async ()=>{
    const  result = await fetchMiddleItems();
    expect(result).toMatchSnapshot();
  });

  it('should be able to get Materials', async ()=>{
    const  result = await fetchMaterials();
    expect(result).toMatchSnapshot();
  });
});