import { getAllMaterialsMajor } from './getAllMaterialsMajor';
describe('getAllMaterialsMajor', () => {
  it('大項目を全て取得', async () => {
    const result = await getAllMaterialsMajor(); 

    console.log('大項目 length: ', result.length);
    expect(result.length).toBeGreaterThan(0);
  });
});