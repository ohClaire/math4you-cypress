describe('Server error flows', () => {
  it('Should return error message for a server error', () => {
    cy.intercept('POST', 'http://localhost:3001/add', {
      statusCode: 500,
    }).as('server-error');

    cy.visit('/play');
    cy.get('.MathCard')
      .eq(4)
      .within(() => {
        cy.get('button').click();
      });
    cy.wait('@server-error').its('response.statusCode').should('eq', 500);
  });
});
