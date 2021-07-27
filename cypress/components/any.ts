// Having more time I'd probably thought of some interface for all components

export class Any {
    selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    get(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selector);
    }
}
