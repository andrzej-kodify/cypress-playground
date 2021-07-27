const TRANSLATIONS = {
    en: {
        spray: 'Spray',
        auto: 'Auto',
        slowRoll: 'Slow Roll'
    }
};


export class ToggleSwitch {
    text: string;
    parentSelector: string;

    constructor(text: string, parentSelector?: string) {
        this.text = text;
        this.parentSelector = parentSelector;
    }

    get(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(`${this.parentSelector || ''} button cw-toggle-switch`).parentsUntil('button').filter(`:contains("${this.text}")`);
    }

    getState() {
        return this.get().then($el => $el.hasClass('switch-on'));
    }

    toggle(desiredState?: boolean) {
        if (desiredState === undefined) {
            return this.get().click();
        }
        return this.getState().then(state => {
            if (state !== desiredState) {
                return this.get().click();
            }
        });
    }
}
