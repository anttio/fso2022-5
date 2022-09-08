describe('Blog app', function () {
  beforeEach(function () {
    // reset the database
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    // create user
    const user = {
      name: 'User McUserface',
      username: 'mcuserface',
      password: 'notgoingtotell',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
    cy.get('form').contains('username');
    cy.get('form').contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login');
      cy.get('#login-username').type('mcuserface');
      cy.get('#login-password').type('notgoingtotell');
      cy.get('#login-submit').click();
      cy.contains('User McUserface logged in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login');
      cy.get('#login-username').type('mcuserface');
      cy.get('#login-password').type('thisisnotthecorrectone');
      cy.get('#login-submit').click();
      cy.get('.notification').should('contain', 'wrong username or password');
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
