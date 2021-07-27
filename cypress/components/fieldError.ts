const TRANSLATIONS = {
    en: {
        required: 'This field is required',
        mustBeEmail: 'This field must be an email',
        doesNotMatchPattern: 'This field does not match the required pattern',
        cannotHaveThisValue: 'This field cannot have this value',
        mustBeSame: 'This field must be the same',
        mustBeUnique: 'This field must be unique',
        mustBeGreaterDate: 'This date must be greater',
        mustBeLesserDate: 'This date must be lesser',
        mustBeGreaterValue: 'You must enter a greater value',
        mustBeLesserValue: 'You must enter a lesser value',
        mustBeValidUrl: 'This field must be a valid URL'
    }
};

export enum FieldErrorType {
    required = 'required',
    mustBeEmail = 'mustBeEmail',
    doesNotMatchPattern = 'doesNotMatchPattern',
    cannotHaveThisValue = 'cannotHaveThisValue',
    mustBeSame = 'mustBeSame',
    mustBeUnique = 'mustBeUnique',
    mustBeGreaterDate = 'mustBeGreaterDate',
    mustBeLesserDate = 'mustBeLesserDate',
    mustBeGreaterValue = 'mustBeGreaterValue',
    mustBeLesserValue = 'mustBeLesserValue',
    mustBeValidUrl = 'mustBeValidUrl',
};

export class FieldError {
    selector: string;

    constructor(parentSelector?: string) {
        this.selector = `${parentSelector || ''} cw-form-errors`;
    }

    get(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selector);
    }

    getErrors() {
        return cy.get(`${this.selector} div:not([hidden])`);
    }

    getError(errorType: FieldErrorType) {
        return this.getErrors().contains(TRANSLATIONS[Cypress.env('language')][errorType]);
    }
}
