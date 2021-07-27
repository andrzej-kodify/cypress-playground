import { AmountInput } from './amountInput';
import { Any } from './any';
import { Range } from './range';
import { ToggleSwitch } from './toggleSwitch';

const TRANSLATIONS = {
    en: {
        spray: 'Spray',
        auto: 'Auto',
        slowRoll: 'Slow Roll'
    }
};

class DiceWager {
    ROOT_SELECTOR = 'cw-dice-wager';
    UI = {
        spray: new ToggleSwitch(TRANSLATIONS[Cypress.env('language')].spray, this.ROOT_SELECTOR),
        auto: new ToggleSwitch(TRANSLATIONS[Cypress.env('language')].auto, this.ROOT_SELECTOR),
        slowRoll: new ToggleSwitch(TRANSLATIONS[Cypress.env('language')].slowRoll, this.ROOT_SELECTOR),
        amountInput: new AmountInput(),
        // TODO create nice components for the ones below
        rollOverUnderButton: new Any(`${this.ROOT_SELECTOR} button.btn-switch.over, ${this.ROOT_SELECTOR} button.btn-switch.under`),
        underOverSlider: new Range(this.ROOT_SELECTOR),
        underOver: new Any('input[formcontrolname="underOver"]'),
        profitBox: new Any('.profit-box cw-pretty-balance'), // TODO create prettyBalance component
        multiplier: new Any('input[formcontrolname="multiplier"]'),
        chance: new Any('input[formcontrolname="chance"]'),
        rollButton: new Any('.btn-roll'),
        rollsPerClick: new Any('input[formcontrolname="rollsPerClick"]'),
    };
}

const diceWager = new DiceWager();

export { diceWager };
