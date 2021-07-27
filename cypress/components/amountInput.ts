import { FieldError } from "./fieldError";

const TRANSLATIONS = {
    en: {
        clear: ' Clear ',
        max:  'Max ',
    }
};

export class AmountInput {
    selector: string;
    fieldError = new FieldError();

    constructor(parentSelector?: string) {
        this.selector = `${parentSelector || ''} cw-amount-input`;
    }

    get(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selector);
    }

    getInput() {
        return cy.get(`${this.selector} input[type="number"]`);
    }

    getButton(text: string) {
        return cy.get(`${this.selector} button`).contains(text);
    }

    clickClear() {
        return this.getButton(TRANSLATIONS[Cypress.env('language')].clear).click();
    }

    clickMax() {
        return this.getButton(TRANSLATIONS[Cypress.env('language')].max).click();
    }

    clickAddOne() {
        return this.getButton(' +1 ').click();
    }

    clickAddTen() {
        return this.getButton(' +10 ').click();
    }

    clickHalve() {
        return this.getButton(' 1/2 ').click();
    }

    clickDouble() {
        return this.getButton(' x2 ').click();
    }
}
