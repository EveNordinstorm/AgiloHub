describe("User login flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("allows a user to open the modal, switch to login form, and log in", () => {
    cy.contains("button", "Login").click();

    // Switch from register form to login form
    cy.contains("span", "Log in").click();

    // Fill in the login form
    cy.get('input[placeholder="Enter your email"]').type("johndoe@mail.com");
    cy.get('input[placeholder="Enter password"]').type("Password123!");

    // Intercept API call for the happy path
    cy.intercept("POST", "**/auth/login", {
      statusCode: 200,
      body: {
        success: true,
        user: {
          id: "1",
          email: "johndoe@mail.com",
          forename: "John",
          surname: "Doe",
        },
      },
    }).as("loginRequest");

    // Submit the form
    cy.get("form#login button[type='submit']").click();

    // Wait for Redux thunk
    cy.wait("@loginRequest");

    // Modal closes on success
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("displays an error message on failed login", () => {
    cy.contains("button", "Login").click();
    cy.contains("span", "Log in").click();

    cy.get('input[placeholder="Enter your email"]').type("wrong@mail.com");
    cy.get('input[placeholder="Enter password"]').type("WrongPassword!");

    // Error response
    cy.intercept("POST", "**/auth/login", {
      statusCode: 401,
      body: { error: "Invalid credentials" },
    }).as("loginRequest");

    cy.get("form#login button[type='submit']").click();

    cy.wait("@loginRequest");

    // Error message should be displayed
    cy.contains("Invalid credentials").should("be.visible");

    // Modal should still be open
    cy.get('[role="dialog"]').should("exist");
  });
});
