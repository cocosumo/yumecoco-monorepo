import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getFormFields } from 'api-kintone';
import { AppIds, prodAppIds } from 'config';
import { removeKeys } from './helper/removeKeys';

describe('customers migration', () => {
  const devAppId = AppIds.customers;
  const prodAppId = prodAppIds.customers;

  let prodFormFields : Properties;
  let devFormFields : Properties;

  beforeAll(async () => {
    prodFormFields = removeKeys(
      (await getFormFields({
        app: prodAppId,
      })).properties,
      ['relatedApp', 'relatedKeyField'],
    );

    devFormFields = removeKeys(
      (await getFormFields({
        app: devAppId,
      })).properties,
      ['relatedApp', 'relatedKeyField'] );


  });

  it('should have different app ids', () => {
    expect(devAppId).not.toEqual(prodAppId);
  });

  test('dev fields match prod fields', async () => {
    expect(devFormFields).toStrictEqual(prodFormFields);
  });
});