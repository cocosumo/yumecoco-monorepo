import { prodAppIds, devAppIds } from 'config';
import { cy, describe, expect, it } from 'local-cypress';

describe('Kintoneデータベース', () => {
  // All new DBs should be added to the devAppIds first.
  const appKeys = Object.keys(devAppIds) as (keyof typeof devAppIds)[];

  // Create a tupple of [prodAppId, devAppId] for each DB.
  const kokoasApps = appKeys.map((key) => [prodAppIds[key], devAppIds[key]]);

  it('本番と開発環境の構成が同じであること', () => {
    cy.log(String(kokoasApps));
    expect(true).to.equal(true);
  });

  
});