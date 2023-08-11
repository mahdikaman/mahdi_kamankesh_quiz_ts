describe('Quiz', () => {
  it('passes game', () => {
    cy.visit('http://localhost:5173')
    cy.get('#name_input').type('Mahdi')
    cy.wait(500)

    cy.get('#difficulty_select').select('Random')
    cy.wait(500)

    cy.get('#region_select').select('Sweden')
    cy.wait(500)

    cy.get('#category_select').select('Film & TV')
    cy.wait(500)

    cy.get('#category_select').select('Food & Drink')
    cy.wait(500)

    cy.get('#category_select').select('Geography')
    cy.wait(500)

    cy.get('button').contains('Start Game').click()
    cy.wait(3000)

    for (let i = 0; i < 9; i++) {
      cy.get('button.answerButton').first().click()
      cy.wait(3333)
    }
    cy.get('.Result > div').should('contain', 'Mahdi')
  })
})
