import { diceWager } from '../components/diceWager';
import { BasePage } from './basePage';
import { IPage } from './iPage';

class DicePage extends BasePage implements IPage {
    UI = {
        wager: diceWager
    };

    ROUTE = `/${Cypress.env('language')}/dice`;
}

const dicePage = new DicePage();

export { dicePage };
