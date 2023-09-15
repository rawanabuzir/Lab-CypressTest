/// <reference types="cypress" />

describe('This is to check Trip information', () => {
    beforeEach(() => {
        cy.visit('https://www.almosafer.com/ar');
        cy.get('.cta__saudi').click();
        cy.wait(2000);
    });

    it('this is to check the departure date is set to be today date +1', () => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let day = String(tomorrow.getDate());
        let month = tomorrow.toLocaleDateString('ar-AE', { month: 'long' });
        let WeekDay = tomorrow.toLocaleDateString('ar-AE', { weekday: 'long' });
        cy.get('[data-testid="FlightSearchBox__FromDateButton"]').should('include.text', `${month}${day} ${WeekDay}`);
    });

    it('this is to check the return date is set to be today date +2', () => {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 2);
        let day = String(tomorrow.getDate());
        let month = tomorrow.toLocaleDateString('ar-AE', { month: 'long' });
        let WeekDay = tomorrow.toLocaleDateString('ar-AE', { weekday: 'long' });
        cy.get('[data-testid="FlightSearchBox__ToDateButton"]').should('include.text', `${month}${day}${WeekDay}`);
    });

    it('this is to check the flight class is set to be economy by default', () => {
        cy.get('.sc-jWxkHr').should('contain.text', 'السياحية');
    });
});