import inputValues from '../fixtures/inputValues.json';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

describe('cart functions and product page functions', () => {
    /* it('', () => {

    }) */

    /* describe('homepage', () => {
        before(() => {
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

        it('can add item to cart on homepage', () => {
            cy.visit('/');
            cy.get('[data-test=itemCard-addToCartButton]').eq(getRandomInt(15))
            .should('be.visible').click();
            cy.findByText('Item added to cart.').should('exist');
        });

        it('should have correct number on badge of cart after adding item', () => {
            cy.get('span.MuiBadge-badge').eq(0).should('have.text', '1')
        })

        it('should have correct number on badge of wishlist after adding item', () => {
            cy.visit('/')
            cy.get('[data-test=itemCard-addToWishlistButton]').eq(getRandomInt(15))
            .should('be.visible').click();
            cy.get('[data-test=menu-wishlist-badge]').should('have.text', '1')
        })

        it('clear the cart after test', () => {
            cy.get('a[href="/cart"]').click();
            if (!cy.get('button').contains('Go shopping').should('exist')) {
                cy.get('button').contains('delete').click();
            }
        })

    }); */

    describe('user cart page & product page', () => {
        before(() => {
            cy.visit('/login');
            cy.get('[data-test=input-Emailaddress]').type(inputValues.email);
            cy.get('[data-test=input-Password]').type(inputValues.password);
            cy.get('button').contains('SIGN IN').click();
        })

        it('can add item to cart on product page', () => {
            cy.get('div.MuiCardContent-root.ItemCard_card__3KdSG').eq(getRandomInt(15)).click();
            cy.get('div.MuiSelect-root.MuiSelect-select').click();
            cy.get('ul li:first').click();
            cy.get('button').contains('Add to cart').should('be.visible').click();
            cy.get('span.MuiBadge-badge').eq(0).should('have.text', '1')
        })

        it('can add item to wishlist on product page', () => {
            cy.visit('/');
            cy.get('div.MuiCardContent-root.ItemCard_card__3KdSG').eq(getRandomInt(15)).should('be.visible').click();
            cy.get('div.MuiSelect-root.MuiSelect-select').click();
            cy.get('ul li:first').click();
            cy.get('button').contains('Add to wishlist').should('be.visible').click();
            cy.get('span.MuiBadge-badge').eq(1).should('have.text', '1')
        })

        it('can add item to cart from wishlist', () => {
            cy.get('a[href="/wishlist"]').click();
            cy.get('button').contains('Add to cart').should('be.visible').click();
            cy.get('span.MuiBadge-badge').eq(1).should('have.text', '2')
        })

        it('can add item to wishlist from cart', () => {
            cy.get('a[href="/cart"]').click();
            cy.get('button').contains('Add to wishlist').should('be.visible').click();
            cy.get('span.MuiBadge-badge').eq(0).should('have.text', '2')
        })

        it('can delete item from cart, cart page will refresh', () => {
            cy.get('button').contains('Delete').its('length').should('eq', 2);
            cy.get('button').contains('Delete').eq(0).click();
            cy.findByText('You have deleted this item from your cart.').should('exist');
            cy.get('button').contains('Delete').its('length').should('eq', 1);
        })

        it('can delete item from wishlist, wishlist page will refresh', () => {
            cy.get('a[href="/wishlist"]').click();
            cy.get('button').contains('Delete').its('length').should('eq', 2);
            cy.get('button').contains('Delete').eq(0).click();
            cy.findByText('You have deleted this item from your wishlist.').should('exist');
            cy.get('button').contains('Delete').its('length').should('eq', 1);
        })
    })
})
