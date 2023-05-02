import { formatDataId } from './formatDataId';


describe('formatDataId', () => {
  test('should format dataId correctly', () => {
    expect(formatDataId('KKB-C23-0001')).toEqual('KKB-C230001');
    expect(formatDataId('KKB-C23-0001-02')).toEqual('KKB-C230001-02');
    expect(formatDataId('')).toEqual('');
    expect(formatDataId('23232323')).toEqual('23232323');
  });
  

  // Add more test cases if needed
});