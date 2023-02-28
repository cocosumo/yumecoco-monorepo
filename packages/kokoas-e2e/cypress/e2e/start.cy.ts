import { cy, expect, describe, it } from 'local-cypress';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://rdmuhwtt6gx7.cybozu.com/k/176/#/');

    expect(true).to.equal(true);
  });
});