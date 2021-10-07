import inputValues from '../fixtures/inputValues.json';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

describe('cart page', () => {
    /* it('', () => {

    }) */
    describe('user cart page', () => {
        beforeEach(() => {
            cy.visit('/login');
            cy.get('[data-test=input-Emailaddress]').type(inputValues.email);
            cy.get('[data-test=input-Password]').type(inputValues.password);
            cy.get('button').contains('SIGN IN').click();
        });
        
        it('goes to homepage after user login', () => {
            cy.findByText('Welcome, Jason').should('exist');
        });

        it('show cart page after user login', () => {
            cy.get('a[href="/cart"]').click();
            cy.get('button').contains('Go shopping').should('exist');
        });

        /* it('can add item to cart on homepage', () => {
            cy.get('a[href="/product"]').eq(8).click();
            cy.findByText('Item added to cart.').should('exist');
        }) */
    
    });

    describe('guest cart page', () => {

    })
})