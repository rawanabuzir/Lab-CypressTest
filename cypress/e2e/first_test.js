/// <reference types="cypress" />

describe('Hotel Search and Sorting Test', () => {
    const destinationsEN = ['Dubai', 'Jeddah', 'Amman'];
    const getRandomDestination = () => destinationsEN[Math.floor(Math.random() * destinationsEN.length)];

    before(() => {
        cy.visit('https://www.almosafer.com/en');
        cy.get('.cta__saudi').click();
        cy.wait(2000);
        cy.get('#uncontrolled-tab-example-tab-hotels').click();
    });

    it('should search for a random destination, select the first result, and sort by lowest price', () => {
        const destination = getRandomDestination();
        cy.intercept('**/th.js', {}).as('thStub');
        cy.get('[data-testid="AutoCompleteInput"]').type(destination);
        cy.get('[data-testid="AutoCompleteResultsList"]').should('be.visible');
        cy.get('[data-testid^="AutoCompleteResultItem"]').first().click();

        cy.get('[data-testid="HotelSearchBox__SearchButton"]').click();
        cy.wait(20000);
        cy.get('[data-testid="HotelSearchResult__sort__LOWEST_PRICE"]').click();
        cy.get('.Price__Value')
            .first()
            .invoke('text')
            .then((firstPrice) => {
                cy.get('.Price__Value')
                    .last()
                    .invoke('text')
                    .then((lastPrice) => {
                        const firstPriceValue = parseFloat(firstPrice.replace(/[^0-9.]/g, ''));
                        const lastPriceValue = parseFloat(lastPrice.replace(/[^0-9.]/g, ''));
                        expect(firstPriceValue).to.be.lessThan(lastPriceValue);
                    });
            });
    });
});