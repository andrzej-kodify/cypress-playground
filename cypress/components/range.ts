export class Range {
    selector: string;

    constructor(parentSelector?: string) {
        this.selector = `${parentSelector || ''} cw-range`;
    }

    get(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selector);
    }

    drag(percent: number) {
        return cy.get(this.selector)
            .then($el => {
                const { left, width, top, height } = $el[0].getBoundingClientRect();
                const handleRect = $el.find('.handle')[0].getBoundingClientRect();
                // TODO well, turns out I failed to calculate it properly or there's some quirk with sliding this in Cypress
                // I've spent way too much time trying to make it work correctly :(
                const midY = top + height/2;
                const targetX = (left - handleRect.left) + width * percent / 100;
                return this.get()
                    .trigger('mousedown', { which: 1, force: true })
                    .trigger('mousemove', targetX, midY, { which: 1, force: true })
                    .trigger('mouseup', { force: true });
            });
    }
}
