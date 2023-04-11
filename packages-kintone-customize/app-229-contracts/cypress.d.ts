
declare namespace Cypress {
  interface Chainable {
    /* CUSTOM COMMANDS */

    /** login. */
    login(): Chainable<JQuery<HTMLElement>>,
    
  }
}