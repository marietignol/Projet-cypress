//! VIRGINIE

describe('View Cart', () => {
  it('step 5 : just view cart', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(4000)
    cy.get('.action.showcart').click()
  })

  it('Click on button "Proceed to Checkout" in cart', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(4000)
    cy.get('.action.showcart').click()
    cy.get('.ui-dialog .block-minicart .checkout').trigger('mouseover')
    cy.get('#top-cart-btn-checkout').click()
    cy.url().should('include', '/checkout/')
  })

  it('Click on button "View and Edit Cart"', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-166').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait(5000)
    cy.get('.action.showcart').click()
    cy.get('a.viewcart').click()
    cy.url().should('include', '/cart/')
    cy.get('.control.qty span.label:contains("Qty")')
      .click({ force: true })
      .siblings('input')
      .clear()
      .type('2')
    cy.screenshot()
  })
})
