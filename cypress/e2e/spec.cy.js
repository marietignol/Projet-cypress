describe('Success', () => {
  it('Scénario 1 : Accéder à la page Tops ', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4').trigger('mouseover')
    cy.get('#ui-id-9').click()
  })
  it('Scénario 1 bis : Accéder à la page Tops ', () => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4').click()
    cy.get('dd > .items > :nth-child(1) > a').click()
  })
  it('Scénario 2 : visualiser  un produit', () => {
    cy.visit('https://magento.softwaretestingboard.com/women/tops-women.html')
    cy.get('.wrapper > .products > :nth-child(1)').click()
  })
  it('Scénario 3 : Sélectionner une taille', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
  })
  it('Scénario 4 : Sélectionner une couleur', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
    cy.get('#option-label-color-93-item-59').click()
  })
  it('Scénario 5 : Ajout dn produit dans le panier', () => {
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html')
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
    cy.get('#option-label-color-93-item-59').click()
    cy.get('#product-addtocart-button').click()
    cy.get('.showcart').should('be.visible')
  })
})

/**
 *  SANS It
 *  cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4').trigger('mouseover')
    cy.get('#ui-id-9').click()
    cy.get('#ui-id-4').click()
    cy.get('dd > .items > :nth-child(1) > a').click()
    cy.get('.wrapper > .products > :nth-child(1)').click()
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
    cy.get('#option-label-color-93-item-59').click()
    cy.get('#option-label-size-143-item-168').trigger('mouseover').click()
    cy.get('#option-label-color-93-item-59').click()
    cy.get('#product-addtocart-button').click()
    cy.get('.showcart').should('be.visible')
*/

