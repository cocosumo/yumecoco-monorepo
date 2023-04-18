
declare namespace Cypress {
  interface Chainable {
    /* CUSTOM COMMANDS */

    /** login. */
    login(): Chainable<JQuery<HTMLElement>>,

    /** ラベルで input を取得する */
    getTextInputsByLabel(label: string, fieldType?: "input" | "textarea"): Chainable<JQuery<HTMLInputElement>>,

    /** ラベルで input[type="checkbox"] を取得する */
    getCheckboxesByLabel(label: string): Chainable<JQuery<HTMLInputElement>>,
  }
}