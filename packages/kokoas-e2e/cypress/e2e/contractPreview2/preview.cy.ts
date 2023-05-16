import { beforeEach, cy, describe, expect } from 'local-cypress';
import { ReqDownloadContractV2Response } from 'types';

describe('プレビュー', () => {
  beforeEach(() => {
    cy.login();
    cy.fixture('testIds').then((testIds) => {
      cy.visit(`/project/contract/preview/v2?contractId=${testIds.contractId}`);
    });
  });
  
  it('プレビュー画面が表示されること', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '**/k/api/proxy/call.json*',
      }, (req) => {
        // 契約ダウンロード以外、他kintone/proxyへのリクエストはそのまま通す
        if (!req.body.url.includes('contract/download')) {
          return;
        }

        req.continue((res) => {
          const {
            documents,
          } = JSON.parse(res.body.result.body) as ReqDownloadContractV2Response;
          expect(documents.length).to.be.greaterThan(0, '書類が1つ以上存在すること');
        });
      },
    ).as('downloadContract');

    cy.contains('button', 'プレビュー').click();
   
  });
});