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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'mcuserface',
        password: 'notgoingtotell',
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#blog-title').type('testing title created by cypress');
      cy.get('#blog-author').type('testing-author');
      cy.get('#blog-url').type('testing-url');
      cy.get('#blog-submit').click();
      cy.contains('testing title created by cypress');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'this is just a blog test',
          author: 'fancy author of the blog',
          url: 'this could be empty',
        });
      });

      it('it can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.get('.blog-likes').should('contain', '1');
      });

      it('it can be deleted by the creator', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'this is just a blog test');
      });
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog test 1',
          author: 'blog author 1',
          url: 'blog url 1',
        });
        cy.createBlog({
          title: 'blog test 2',
          author: 'blog author 2',
          url: 'blog url 2',
        });
        cy.createBlog({
          title: 'blog test 3',
          author: 'blog author 3',
          url: 'blog url 3',
        });
      });

      it('they are sorted by likes', function () {
        cy.visit('http://localhost:3000');
        cy.get('.blog').eq(0).contains('blog test 1');
        cy.get('.blog').eq(1).contains('view').click();
        cy.get('.blog').eq(1).contains('like').click();
        cy.visit('http://localhost:3000');
        cy.get('.blog').eq(0).contains('blog test 2');
      });
    });
  });
});
