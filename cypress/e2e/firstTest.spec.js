describe('Test with backend', () => {
  beforeEach('Login to App', () => {
    cy
      .loginToApplication();
  })

      it('Should log in', () => {
        cy
          .log('Yaaay we logged in')
      })

      it.only('Verify correct request and response', () => {
       cy
        .intercept('POST', 'https://api.realworld.io/api/articles').as('postArticles')

        .get('.nav')
        .contains('New Article').click()
        .get('[formcontrolname="title"]').type('This is the title 3')
        .get('[formcontrolname="description"]').type('This is a description')
        .get('[formcontrolname="body"]').type('This is a body of the article')
        .get('.btn')
        .contains('Publish Article').click()
           
        .wait('@postArticles').then(xhr => {
          console.log(xhr)
          expect(xhr.response.statusCode).to.equal(200)
          expect(xhr.request.body.article.body).to.equal('This is a body of the article')
          expect(xhr.response.body.article.description).to.equal('This is a description')
        })

      });
})