import { productCategory } from '../../src/const/constants';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
const randomIdx = getRandomInt(productCategory.length);

describe('homepage', () => {
    /* it('', () => {

    }) */

    describe('menu drawer', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('[data-test=homepage-menu-openButton]').click();
        });

        it('should show when menu icon was clicked', () => {
            cy.get('[data-test=homepage-menu-list]').should('be.visible')
        });

        /* it('should sift out products correspond to the category being clicked', () => {
            cy.get('[data-test=homepage-menu-list]').contains(productCategory[randomIdx]).click();
            //console.log('test', cy.get('[data-test=homepage-product-card]').its('length'))
            cy.get('a[href="/product"]').its('length').should('be.gt',0).should('be.lt', 29);
        });

        it('all products shown when logo was clicked', () => {
            cy.get('[data-test=homepage-menu-list]').contains(productCategory[randomIdx]).click();
            cy.findByText('My Wei Shop').click();
            cy.get('a[href="/product"]').its('length').should('eq', 29);
        }) */

        it('should close when close drawer button was clicked', () => {
            cy.get('[data-test=homepage-menu-closeButton]').click();
            cy.get('[data-test=homepage-menu-list]').should('not.be.visible')
        })
    })
})
