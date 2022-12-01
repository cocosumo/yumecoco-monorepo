import { uploadPostalCode } from './uploadPostalCode';

describe('uploadPostalCode', () => {
  it('should parse and upload csv to kintone', () => {
    uploadPostalCode([{
      postalCode: { value: '0600000' },
      prefReading: { value: 'ﾎｯｶｲﾄﾞｳ' },
      cityReading:{ value: 'ｻｯﾎﾟﾛｼﾁｭｳｵｳｸ' },
      townReading:{ value: 'ｲｶﾆｹｲｻｲｶﾞﾅｲﾊﾞｱｲ' },
      pref:{ value: '北海道' },
      city:{ value: '札幌市中央区' },
      town:{ value: '以下に掲載がない場合' },
    }]);
  });
});