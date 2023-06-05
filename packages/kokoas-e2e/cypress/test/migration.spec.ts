import { GetFormFieldsReturn } from 'api-kintone';
import { fieldMapSorter, getLookUp, removeKeys, removeLookUp } from 'api-kintone/src/@app/helpers';
import { prodAppIds, devAppIds } from 'config';
import { before, context, cy, expect, it } from 'local-cypress';

// 廃止されるアプリは、以下に追加する。
const except : (keyof typeof devAppIds)[] = ['projEstimates'];

// All new DBs should be added to the devAppIds first.
const appKeys = Object.keys(devAppIds) as (keyof typeof devAppIds)[];


// Create a tupple of [prodAppId, devAppId] for each DB.
const kokoasApps = appKeys
  .filter((key) => !except.includes(key))
  .map((key) => ({ [key]: [prodAppIds[key], devAppIds[key]] }));

// テストしたいアプリがあれば、以下を編集する。
//const kokoasApps = [{ projEstimates: [210, 202] }];

kokoasApps
  .forEach((app) => {
    const [key, values] = Object.entries(app)[0];
    const [prodAppId, devAppId] = values;
    context(`${key}のDBのマイグレーションチェック。本番-${prodAppId}, 開発-${devAppId}`, () => {
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

      
      it('ルークアップ以外、フィールドがマッチしていること', () => {
        const devNoLookUp = removeLookUp(devApp);
        const prodNoLookUp = removeLookUp(prodApp);

        // フィールドが一致していないと、失敗します。
        for (const [devFieldKey, devFieldValue ] of Object.entries(devNoLookUp)) {
          const prodFieldValue = prodNoLookUp[devFieldKey];
          cy.log(`${devFieldKey}をチェックしています。`);

          // 本番で存在していないと、失敗します。
          cy.wrap(prodFieldValue).should('not.be.undefined');
          if (!prodFieldValue) return;

          // フィールドの設定が異なると、失敗します。
          for (const [settingKey, devSettingValue] of Object.entries(devFieldValue)) {
            cy.log(`${devFieldKey}の${settingKey}をチェックしています。`);
            const prodSettingValue = prodFieldValue[settingKey as keyof typeof prodFieldValue];
            cy.wrap(prodFieldValue).should('not.be.undefined');

            if (typeof devSettingValue === 'object') {
      
              // サブテーブルの場合、フィールドの設定が異なると、失敗します。
              for (const [subFieldKey, devSubFieldValue] of Object.entries(devSettingValue)) {
                cy.log(`サブテーブル: ${devFieldKey}の${settingKey}の${subFieldKey}をチェックしています。`);
                const prodSubFieldValue = prodSettingValue[subFieldKey as keyof typeof prodSettingValue];
                // 本番で存在していないと、失敗します。
                cy.wrap(prodSubFieldValue).should('not.be.undefined');
                if (!prodSubFieldValue) return;

                for (const [subSettingKey, devSubSettingValue] of Object.entries(devSubFieldValue as object)) {
                  const prodSubSettingValue = prodSubFieldValue[subSettingKey as keyof typeof prodSubFieldValue];
                  cy.wrap(prodSubSettingValue).should('not.be.undefined');

                  cy.log(`サブテーブルフィールド設定: ${devFieldKey}の${settingKey}の${subFieldKey}の${subSettingKey}をチェックしています。`);
                  cy.wrap(devSubSettingValue).should('equal', prodSubSettingValue);
                }
              }
            } else {
              cy.wrap(devSettingValue).should('equal', prodSettingValue);
            }
          }

        }
          
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

