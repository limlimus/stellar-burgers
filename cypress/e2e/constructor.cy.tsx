import ingredients from '../e2e/fixtures/ingredients.json';
import user from '../e2e/fixtures/user.json';
import orderBurger from '../e2e/fixtures/order-burger.json';

const testUrl = 'http://localhost:4000';

const SELECTORS = {
  ingredientLink: (id: string) =>
    `[data-cy=cy-ingredient] a[href="/ingredients/${id}"]`,
  constructorTop: '[data-cy=constructor-top]',
  constructorBottom: '[data-cy=constructor-bottom]',
  constructorMain: '[data-cy=constructor-main]',
  createOrderButton: '[data-cy=cy-create-order] button',
  modal: '[data-cy=cy-modal]',
  modalClose: '[data-cy=modal-close]',
  modalOverlay: '[data-cy=modal-overlay]',
  noIngredients: '[data-cy=no-ingredients]'
};

const bun = ingredients.find((item) => item.type === 'bun');
const filling = ingredients.find((item) => item.type === 'main');
const ingredient = ingredients[0];

describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'fakeRefreshToken');
    cy.setCookie('accessToken', 'Bearer fakeAccessToken');

    cy.intercept('GET', '**/api/ingredients', {
      statusCode: 200,
      body: { success: true, data: ingredients }
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        data: user
      }
    }).as('getUserData');

    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: orderBurger
    }).as('createOrder');

    cy.visit(testUrl);
    cy.wait('@getIngredients');
    cy.wait('@getUserData');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('добавляет булку и начинку в конструктор по клику', () => {
    cy.get(SELECTORS.ingredientLink(bun!._id)).parent().find('button').click();
    cy.get(SELECTORS.constructorTop).should('contain', bun?.name);
    cy.get(SELECTORS.constructorBottom).should('contain', bun?.name);
    cy.get(SELECTORS.ingredientLink(filling!._id))
      .parent()
      .find('button')
      .click();
    cy.get(SELECTORS.constructorMain).should('contain', filling?.name);
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.get(SELECTORS.ingredientLink(ingredient._id)).click();
    cy.get(SELECTORS.modal).should('exist').and('contain', ingredient.name);
    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modal).should('not.exist');
    cy.get(SELECTORS.ingredientLink(ingredient._id)).click();
    cy.get(SELECTORS.modalOverlay).click('topLeft', { force: true });
    cy.get(SELECTORS.modal).should('not.exist');
  });

  it('создаёт и оформляет заказ', () => {
    cy.get(SELECTORS.ingredientLink(bun!._id)).parent().find('button').click();
    cy.get(SELECTORS.ingredientLink(filling!._id))
      .parent()
      .find('button')
      .click();

    cy.get(SELECTORS.createOrderButton).parent().find('button').click();
    cy.wait('@createOrder');
    cy.get(SELECTORS.modal)
      .should('be.visible')
      .contains(orderBurger.order.number);

    cy.get(SELECTORS.constructorTop).should('not.exist');
    cy.get(SELECTORS.noIngredients).should('exist');
    cy.get(SELECTORS.constructorBottom).should('not.exist');

    cy.get(SELECTORS.modalClose).click();
    cy.get(SELECTORS.modal).should('not.exist');
    cy.get(SELECTORS.modal).should('not.exist');
  });
});
