import { FieldErrorType } from "../../components/fieldError";
import { dicePage } from "../../pages/dicePage";

describe('CSGORoll dice page', () => {
  const wager = dicePage.UI.wager;

  beforeEach(() => {
    cy.visit(dicePage.ROUTE);
  })

  it('shows defaults', () => {
    // TODO check what the defaults should be instead of relying on what's displayed when writing this test
    wager.UI.amountInput.getInput().should('have.value', 1);
    wager.UI.profitBox.get().should('have.text', '1.00');
    wager.UI.underOver.get().should('have.value', 47.5);
    wager.UI.multiplier.get().should('have.value', 2);
    wager.UI.chance.get().should('have.value', 47.5);
    wager.UI.rollOverUnderButton.get().click();
    wager.UI.amountInput.getInput().should('have.value', 1);
    wager.UI.profitBox.get().should('have.text', '1.00');
    wager.UI.underOver.get().should('have.value', 52.49);
    wager.UI.multiplier.get().should('have.value', 2);
    wager.UI.chance.get().should('have.value', 47.5);
  });

  describe('bet amount buttons', () => {
    it('adds one', () => {
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1);
      wager.UI.amountInput.clickAddOne();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 2);
      wager.UI.amountInput.getInput().clear().type('999.01');
      wager.UI.amountInput.clickAddOne();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1000.01);
      wager.UI.amountInput.getInput().clear();
      wager.UI.amountInput.clickAddOne();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1);
    });

    it('adds ten', () => {
      wager.UI.amountInput.getInput().should('have.value', 1);
      wager.UI.amountInput.clickAddTen();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 11);
      wager.UI.amountInput.getInput().clear().type('990.01');
      wager.UI.amountInput.clickAddTen();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1000.01);
      wager.UI.amountInput.getInput().clear();
      wager.UI.amountInput.clickAddTen();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 10);
    });

    it('halves', () => {
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1);
      wager.UI.amountInput.clickHalve();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 0.5);
      // TODO seems that something overlaps the input, hence { force: true }, possibly related to https://github.com/cypress-io/cypress/issues/4233
      wager.UI.amountInput.getInput().clear({ force: true }).type('1000.01');
      wager.UI.amountInput.clickHalve();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 500.01);
      wager.UI.amountInput.getInput().clear({ force: true });
      wager.UI.amountInput.clickHalve();
      wager.UI.amountInput.getInput().should('have.value', 0);
      wager.UI.amountInput.fieldError.getErrors().should('have.have.length', 1);
      wager.UI.amountInput.fieldError.getError(FieldErrorType.mustBeGreaterValue);
    });

    it('doubles', () => {
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1);
      wager.UI.amountInput.clickDouble();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 2);
      wager.UI.amountInput.getInput().clear({ force: true }).type('500.51');
      wager.UI.amountInput.clickDouble();
      wager.UI.amountInput.fieldError.getErrors().should('not.exist');
      wager.UI.amountInput.getInput().should('have.value', 1001.02);
      wager.UI.amountInput.getInput().clear({ force: true });
      wager.UI.amountInput.clickDouble();
      wager.UI.amountInput.getInput().should('have.value', 0);
      wager.UI.amountInput.fieldError.getErrors().should('have.have.length', 1);
      wager.UI.amountInput.fieldError.getError(FieldErrorType.mustBeGreaterValue);
    });
  });

  describe('under/over', () => {
    it.skip('updates values on drag', () => {
      // TODO broken drag :(
      wager.UI.underOverSlider.drag(10).wait(3000);
      wager.UI.underOverSlider.drag(50).wait(3000);
      wager.UI.underOverSlider.drag(100).wait(3000);
      wager.UI.underOverSlider.drag(0).wait(3000);
    });
  });

  describe('spray mode', () => {
    it('updates roll button', () => {
      wager.UI.rollButton.get().should('have.text', ' ROLL DICE '); // TODO translations
      wager.UI.spray.toggle();
      // This will intentionally fail on largest number 
      for(const numOfRolls of ['1', '2', '100', '1000', '10000000000000000000000000000000']) {
        wager.UI.rollsPerClick.get().clear().type(numOfRolls);
        wager.UI.rollButton.get().should('have.text', ` ROLL ${numOfRolls} TIME${numOfRolls === '1' ? '' : 'S'} `); // TODO translations
      }
    });
  })
});
