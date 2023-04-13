import { GetFormFieldsReturn, getFormFields } from 'api-kintone';
import { prodAppIds, devAppIds } from 'config';
import { before, context, cy, expect, it } from 'local-cypress';

/**
 * Primitive, Lookup
 */

// All new DBs should be added to the devAppIds first.
const appKeys = Object.keys(devAppIds) as (keyof typeof devAppIds)[];

// Create a tupple of [prodAppId, devAppId] for each DB.
const kokoasApps = appKeys
  .map((key) => ({ [key]: [prodAppIds[key], devAppIds[key]] }));
 
kokoasApps
  .forEach((app) => {
    const [key, values] = Object.entries(app)[0];
    const [prodAppId, devAppId] = values;
    context(`${key}のDBのマイグレーションチェック`, () => {
      let devApp : GetFormFieldsReturn = Object.create(null);
      let prodApp : GetFormFieldsReturn = Object.create(null);

      before(() => {
        cy.task<GetFormFieldsReturn>('getDBFields', devAppId)
          .then((fields) => {
            devApp = fields;
          });
        cy.task<GetFormFieldsReturn>('getDBFields', prodAppId)
          .then((fields) => {
            prodApp = fields;
          });

      });
      it('本番と開発環境のアプリIDが異なること', () => {
        expect(prodAppId).not.to.equal(devAppId);
      });

      it('Primitiveフィールドは同じであること', () => {
        Object.entries(devApp.properties)
          .forEach(([fieldName, props]) => {

            cy.log(`${fieldName}のチェック`);

            Object.entries(props).forEach(([prop, propVal]) => {
              if (typeof propVal !== 'object') {
                console.log(fieldName, prop, propVal);
              }
            });
          });
        console.log(devApp);
        console.log(prodApp);
      });

    });

  });

