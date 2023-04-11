import { cy, describe, it } from 'local-cypress';

describe('template spec', () => {
  beforeEach(() => {
    cy.login();
    //https://rdmuhwtt6gx7.cybozu.com/k/229/show#record=6&mode=edit
    cy.visit('/show#record=6&mode=edit');
  });

  it('', () => {
    //cy.visit('/');
  });
});