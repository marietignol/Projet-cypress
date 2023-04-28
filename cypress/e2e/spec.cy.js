/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

describe('purchase of an article', () => {
  // mettre un article dans le panier
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/')
    cy.get('#ui-id-4 > :nth-child(2)').click() // page women
    cy.get('dd > .items > :nth-child(1) > a').click() // page tops 50
    cy.get(
      ':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo'
    ).click() // page produit
    cy.get('#option-label-color-93-item-59').click() // choix couleur
    cy.get('#option-label-size-143-item-168').click() // taille
    cy.get('#product-addtocart-button > span').click() // ajouter au panier
    cy.wait(8000) // attente que le panier soit mis à jour.
    cy.get('.showcart').click() // aller au panier
  })

  it('proceed to payment', () => {
    cy.get('#top-cart-btn-checkout').click()
    cy.url().should(
      'include',
      'https://magento.softwaretestingboard.com/checkout'
    )
    cy.get('#shipping').should('be.visible')
  })
  it('fills out the shipping form', () => {
    cy.visit('https://magento.softwaretestingboard.com/checkout#shipping')
    cy.get(
      '#customer-email-fieldset > .required > .control > #customer-email'
    ).type(faker.internet.email())
    cy.get('[name="firstname"]').type(faker.name.firstName())
    cy.get('[name="lastname"]').type(faker.name.lastName())
    cy.get('[name="company"]').type(faker.company.name())
    cy.get('[name="street[0]"]').type(faker.address.streetAddress())
    cy.get('[name="street[1]"]').type(faker.address.streetAddress())
    cy.get('[name="street[2]"]').type(faker.address.streetAddress())
    cy.get('[name="city"]').type(faker.address.city())
  })
})
