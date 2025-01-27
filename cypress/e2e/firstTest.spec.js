describe('Test with backend', () => {
  beforeEach('Login to App', () => {
    cy
      .loginToApplication();
  })

  it('passes', () => {
    cy.log('Yaaay we logged in')
  })
})