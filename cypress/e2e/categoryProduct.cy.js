describe('Success', () => {
    it('passes', () => {
      cy.visit('https://magento.softwaretestingboard.com/')
      cy.get('#ui-id-4').trigger('mouseover')
      cy.get('#ui-id-9').click()
      cy.get('.wrapper > .products > :nth-child(1)').click()
      cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
      cy.get('#option-label-color-93-item-59').click()
      cy.get('#product-addtocart-button').click()
      cy.get('.showcart').should('be.visible')
      cy.get('.message-success').should('be.visible')
    })
  })
  