import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getFormFields } from 'api-kintone';
import { AppIds, prodAppIds } from 'config';

describe('custGroup migration', () => {
  const devAppId = AppIds.custGroups;
  const prodAppId = prodAppIds.custGroups;

  let prodFormFields : Properties;
  let devFormFields : Properties;

  beforeAll(async () => {
    prodFormFields = (await getFormFields({
      app: prodAppId,
    })).properties;

    devFormFields = (await getFormFields({
      app: devAppId,
    })).properties;


  });

  it('should have different app ids', () => {
    expect(devAppId).not.toEqual(prodAppId);
  });

  test('dev fields match prod fields', async () => {
    expect(devFormFields).toStrictEqual(prodFormFields);
  });
});