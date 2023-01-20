import { createEstExcel } from './createEstExcel';

describe('createEstExcel', () => {
  it('should create 見積 in xlsx format', async () => {
    const result = await createEstExcel('test');

    expect(result).toBeTruthy();
  });
});