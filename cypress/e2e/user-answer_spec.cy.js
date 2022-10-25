describe('User answer flows', () => {
  beforeEach(() => {
    cy.visit('/select');
    cy.get('[value="+"]').click();
    cy.get('.NextButton').click();
    cy.intercept(
      { method: 'POST', url: 'http://localhost:3001/add' },
      {
        statusCode: 201,
        fixture: 'sample-data.json',
      }
    ).as('answer');
  });

  it('Should see card be replaced when the user gets the answer wrong', () => {
    cy.get('.MathCard')
      .first()
      .within(() => {
        cy.get('input').type('5');
        cy.get('button').click();
      });

    cy.wait('@answer').its('response.statusCode').should('eq', 201);
    cy.get('.MathCard').first().should('be.visible');
    cy.get('.MathCard').first().should('have.class', 'incorrect');
  });

  it('Should see message if user gets the answer correct', () => {
    cy.get('.MathCard')
      .first()
      .within(() => {
        cy.get('input').type('28');
        cy.get('button').click();
      });
    cy.wait('@answer').its('response.statusCode').should('eq', 201);
    cy.get('.MathCard').first().should('have.class', 'correct');
    cy.get('.MathCard').first().should('not.be.visible');
  });
});
