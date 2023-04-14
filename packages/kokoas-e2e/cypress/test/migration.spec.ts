import { GetFormFieldsReturn } from 'api-kintone';
import { fieldMapSorter, getLookUp, removeKeys } from 'api-kintone/src/@app/helpers';
import { prodAppIds, devAppIds } from 'config';
import { before, context, cy, expect, it } from 'local-cypress';

/**
 * Primitive, Lookup
 */

// All new DBs should be added to the devAppIds first.
const appKeys = Object.keys(devAppIds) as (keyof typeof devAppIds)[];


// Create a tupple of [prodAppId, devAppId] for each DB.
//const kokoasApps = appKeys.map((key) => ({ [key]: [prodAppIds[key], devAppIds[key]] }));
const kokoasApps = [{ projEstimates: [210, 202] }];

kokoasApps
  .forEach((app) => {
    const [key, values] = Object.entries(app)[0];
    const [prodAppId, devAppId] = values;
    context(`${key}のDBのマイグレーションチェック`, () => {
      let devApp : GetFormFieldsReturn['properties'] = Object.create(null);
      let prodApp : GetFormFieldsReturn['properties'] = Object.create(null);

      before(() => {
        cy.task<GetFormFieldsReturn>('getDBFields', devAppId)
          .then((fields) => {
            devApp = removeKeys(fields, ['relatedApp', 'relatedKeyField']).properties;
          });
        cy.task<GetFormFieldsReturn>('getDBFields', prodAppId)
          .then((fields) => {
            prodApp = removeKeys(fields, ['relatedApp', 'relatedKeyField']).properties;
          });

      });
      it('本番と開発環境のアプリIDが異なること', () => {
        expect(prodAppId).not.to.equal(devAppId);
      });

      it('全てのルークアップが一致していること', () => {
        const prodLookUps = getLookUp(devApp);
        const devLookUps = getLookUp(prodApp);
        
        for (const devLookup of devLookUps) {
          
          const prodLookUp = prodLookUps.find(({ code }) => code === devLookup.code );

          // 本番で存在していないと、失敗します。
          expect(prodLookUp).not.to.be.undefined;
          
          if (!prodLookUp) return;

          const prodSortedFieldMap = prodLookUp.lookup.fieldMappings.sort(fieldMapSorter);
          const devSortedFieldMap = devLookup.lookup.fieldMappings.sort(fieldMapSorter);

          // コピーフィールドの設定が異なると、失敗します。
          expect(devSortedFieldMap).to.deep.eq(prodSortedFieldMap);
          
          // ルークアップの関連のアプリIDが開発環境のものだと、失敗します。
          expect(Object.values(devAppIds)).to.not.include(prodLookUp.lookup.relatedApp.app);

        }
    
      });

    });

  });

