import { parseExcelSerialDate } from './parseExcelSerialDate';

describe('parseExcelSerialDate', () => {
  it('should parse date to GMT+9', () => {
    const result = parseExcelSerialDate(44138);

    console.log(result);

    expect(result).toBeTruthy();
  });
});