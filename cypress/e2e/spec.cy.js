import { faker } from '@faker-js/faker'

describe('Test Magento website', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/checkout*').as('getCartPage')
    cy.intercept('GET', '**/cart*').as('shippingInfo')
    cy.intercept('POST', '**/*payment*').as('payment')
  })

  it('step 1 : go to the Tops page and select a product', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4').trigger('mouseover')
    cy.get('#ui-id-9').click()
    cy.get('.wrapper > .products > :nth-child(1)').click()
  })

  it('add product to cart / update quantity / shipping information / payment', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').should('be.visible');
    cy.get('#product-addtocart-button').click()
    cy.wait(5000) 
    cy.get('.action.showcart').click()
    cy.get('a.viewcart').click()

    cy.wait('@getCartPage').then(() => {
      cy.url().should('include', '/cart/');
      cy.get('.control.qty span.label:contains("Qty")')
        .click({ force: true })
        .siblings('input')
        .clear()
        .type('2');
      cy.get('.update').click();
    });

    cy.wait(4000)
    cy.get('[data-validate*="validate-greater-than-zero"]').should('have.value', '2')
    cy.get('.methods > :nth-child(1) > .action').click()  

    cy.wait('@shippingInfo').then(() => {
      cy.url().should(
        'include',
        'https://magento.softwaretestingboard.com/checkout'
      );
      cy.get('#customer-email').should('be.visible').type(faker.internet.email());
      cy.get('[name="firstname"]').type(faker.name.firstName());
      cy.get('[name="lastname"]').type(faker.name.lastName());
      cy.get('[name="company"]').type(faker.company.name());
      cy.get('[name="street[0]"]').type(faker.address.streetAddress());
      cy.get('[name="street[1]"]').type(faker.address.streetAddress());
      cy.get('[name="street[2]"]').type(faker.address.streetAddress());
      cy.get('[name="city"]').type(faker.address.city());
      cy.get('[name="region_id"]').select('Rhode Island');
      cy.get('[name="postcode"]').type(faker.address.zipCode());
      cy.get('[name="telephone"]').type(faker.phone.phoneNumber());
      cy.get(':nth-child(1) > :nth-child(1) > .radio').check();
      cy.get('.button > span').click();
    });

    cy.wait('@payment').then(() => {
      cy.get('.payment-method-content > :nth-child(4) > div.primary').click();
      cy.wait(3000);
      cy.get('.page-title-wrapper span.base')
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Thank you for your purchase!');
      });
    });
  })
})