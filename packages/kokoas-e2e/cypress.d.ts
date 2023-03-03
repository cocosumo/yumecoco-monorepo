
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login.
     */
    login(): Chainable<JQuery<HTMLElement>>
  }
}