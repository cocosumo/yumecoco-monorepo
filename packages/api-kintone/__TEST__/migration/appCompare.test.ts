import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getFormFields } from 'api-kintone';
//import { AppIds, prodAppIds } from 'config';
import { fieldMapSorter } from './helper/fieldMapSorter';
import { getLookUp } from './helper/getLookup';
import { removeKeys } from './helper/removeKeys';
import { removeLookUp } from './helper/removeLookUp';


// 現在見積のみですが、他アプリを含むツールに改善する方針です。

describe('migration', () => {
  const devAppId = 202;
  const prodAppId = 210;

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
    const devNoLookUp = removeLookUp(devFormFields);
    const prodNoLookUp = removeLookUp(prodFormFields);

    expect(devNoLookUp).toStrictEqual(prodNoLookUp);
  });

  test('lookup field mappings should match', () => {
    const prodLookUps = getLookUp(prodFormFields);
    const devLookUps = getLookUp(devFormFields);

    for (const devLookup of devLookUps) {
      const prodLookUp = prodLookUps.find(({ code }) => code === devLookup.code );
      const prodSortedFieldMap = prodLookUp?.lookup.fieldMappings.sort(fieldMapSorter) ?? [];
      const devSortedFieldMap = devLookup?.lookup.fieldMappings.sort(fieldMapSorter) ?? [];
      expect(devSortedFieldMap).toStrictEqual(prodSortedFieldMap);
    }
  });
});