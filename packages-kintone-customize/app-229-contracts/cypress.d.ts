
declare namespace Cypress {
  interface Chainable {
    /* CUSTOM COMMANDS */

    /** login. */
    login(): Chainable<JQuery<HTMLElement>>,
    
    /** ラベルで input を取得する */
    getTextInputsByLabel(label: string): Chainable<JQuery<HTMLInputElement>>,
  }
}