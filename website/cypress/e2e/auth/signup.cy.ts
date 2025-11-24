describe("User sign up flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("allows a user to open the modal and fill in the form to create an account", () => {
    cy.contains("button", "Login").click();

    cy.get('input[placeholder="Forename"]').type("John");
    cy.get('input[placeholder="Surname"]').type("Doe");
    cy.get('input[placeholder="Enter email"]').type("johndoe@mail.com");
    cy.get('input[placeholder="Create password"]').type("Password123!");
    cy.get('input[placeholder="Confirm password"]').type("Password123!");

    // Intercept API call so the test doesn't depend on the backend
    cy.intercept("POST", "**/auth/register", {
      statusCode: 200,
      body: { success: true, message: "Account created" },
    }).as("registerRequest");

    // Submit
    cy.contains("button", "Create Account").click();

    // Wait for Redux thunk
    cy.wait("@registerRequest");

    // Modal close on success
    cy.get('[role="dialog"]').should("not.exist");
  });
});
