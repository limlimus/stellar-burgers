import ingredients from '../e2e/fixtures/ingredients.json';
import user from '../e2e/fixtures/user.json';
import orderBurger from '../e2e/fixtures/order-burger.json';

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

    cy.visit('http://localhost:4000/');
    cy.wait('@getIngredients');
    cy.wait('@getUserData');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('добавляет булку и начинку в конструктор по клику', () => {
    cy.get(`[data-cy=cy-ingredient] a[href="/ingredients/${bun?._id}"]`)
      .parent()
      .find('button')
      .click();
    cy.get('[data-cy=constructor-top]').should('contain', bun?.name);
    cy.get('[data-cy=constructor-bottom]').should('contain', bun?.name);
    cy.get(`[data-cy=cy-ingredient] a[href="/ingredients/${filling?._id}"]`)
      .parent()
      .find('button')
      .click();
    cy.get('[data-cy=constructor-main]').should('contain', filling?.name);
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.get(
      `[data-cy=cy-ingredient] a[href="/ingredients/${ingredient._id}"]`
    ).click();
    cy.get('[data-cy=cy-modal]')
      .should('exist')
      .and('contain', ingredient.name);
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=cy-modal]').should('not.exist');
    cy.get(
      `[data-cy=cy-ingredient] a[href="/ingredients/${ingredient._id}"]`
    ).click();
    cy.get('[data-cy=modal-overlay]').click('topLeft', { force: true });
    cy.get('[data-cy=cy-modal]').should('not.exist');
  });

  it('создаёт и оформляет заказ', () => {
    cy.get(`[data-cy=cy-ingredient] a[href="/ingredients/${bun?._id}"]`)
      .parent()
      .find('button')
      .click();
    cy.get(`[data-cy=cy-ingredient] a[href="/ingredients/${filling?._id}"]`)
      .parent()
      .find('button')
      .click();
    cy.get(`[data-cy=cy-create-order]`).find('button').click();
    cy.wait('@createOrder');
    cy.get('[data-cy=cy-modal]').should('be.visible');
    cy.get('[data-cy=cy-modal]').contains(orderBurger.order.number);
    cy.get('[data-cy=constructor-top]').should('not.exist');
    cy.get('[data-cy=no-ingredients]').should('exist');
    cy.get('[data-cy=constructor-bottom]').should('not.exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=cy-modal]').should('not.exist');
    cy.get('[data-cy=cy-moda]').should('not.exist');
  });
});
