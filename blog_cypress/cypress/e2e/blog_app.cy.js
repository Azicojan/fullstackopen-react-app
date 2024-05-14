describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name:'Aziz',
      username: 'Azicojan',
      password: 'azik123'
    }

    const user2 = {
      name: 'rabbit123',
      username: 'Dexter',
      password: 'dexter123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:5173')
  })
  
  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('Azicojan')
      cy.get('input:last').type('azik123')
      cy.contains('login').click()

      cy.contains('Aziz logged-in')

    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('Azicojan')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('Azicojan')
      cy.get('input:last').type('azik123')
      cy.contains('login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Euro 2024')
      cy.get('#author').type('Azicojan')
      cy.get('#url').type('google.com')
      cy.get('#create').click()

      cy.get('.bloglist').should('contain', 'Euro 2024 - Azicojan')
      //cy.contains('Euro 2024')
    })

    describe('users can like a blog', function() {
      beforeEach(function() {
             
          cy.contains('new blog').click()
          cy.get('#title').type('Euro 2024')
          cy.get('#author').type('Azicojan')
          cy.get('#url').type('google.com')
          cy.get('#create').click()
    
          cy.get('.bloglist').should('contain', 'Euro 2024 - Azicojan')
          //cy.contains('Euro 2024')
        
      })
  
      it('user likes a blog', function() {
        cy.contains('view').click()
        cy.get('.btn_likes').click()

        cy.get('.likes').should('contain', 'likes: 1')
      })

      it('only a creator can delete a blog', function() {
        cy.contains('view').click()
        cy.get('.bloglist')
          .should('contain', 'Azicojan')
          .and('contain','remove')
        
      })

      it('others cannot see the remove button', function() {
        cy.contains('logout').click()

        cy.get('input:first').type('Dexter')
        cy.get('input:last').type('dexter123')
        cy.contains('login').click()
        cy.contains('view').click()

        cy.get('.bloglist').should('not.contain', 'remove')

      })

      it('the most liked blog', function() {
        cy.contains('view').click()
        cy.get('.btn_likes').click()
        cy.get('.btn_likes').click()
        cy.get('.btn_likes').click()

        cy.get('.likes').should('contain', 'likes: 3')
        cy.contains('logout').click()

        cy.get('input:first').type('Dexter')
        cy.get('input:last').type('dexter123')
        cy.contains('login').click()
        

        cy.contains('new blog').click()
          cy.get('#title').type('My summer trip to Germany')
          cy.get('#author').type('Dexter')
          cy.get('#url').type('google.com')
          cy.get('#create').click()

          cy.contains('My summer trip to Germany - Dexter').parent().find('.togglable').click()
          cy.contains('My summer trip to Germany - Dexter').parent().parent().find('.btn_likes').click()
          cy.contains('My summer trip to Germany - Dexter').parent().find('.likes').should('contain', 'likes: 1')
        
        cy.get('.bloglist').eq(0).should('contain', 'Euro 2024')
        cy.get('.bloglist').eq(1).should('contain', 'My summer trip to Germany')
      })
     
    })

    
  }) 


})

