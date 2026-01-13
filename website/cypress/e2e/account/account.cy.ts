describe("Account page", () => {
  describe("Unauthenticated state", () => {
    it("shows login prompt when user is not authenticated", () => {
      // Stub refresh to fail (no valid session)
      cy.intercept("POST", "**/auth/refresh", {
        statusCode: 401,
        body: { error: "Unauthorized" },
      }).as("refreshRequest");

      cy.visit("http://localhost:3000/account");

      cy.contains("Please").should("be.visible");
      cy.contains("log in").should("be.visible");
      cy.contains("sign up").should("be.visible");
    });
  });

  describe("Authenticated state", () => {
    beforeEach(() => {
      // Stub the refresh endpoint to simulate an authenticated session
      cy.intercept("POST", "**/auth/refresh", {
        statusCode: 200,
        body: {
          accessToken: "mock-access-token",
          user: {
            id: "1",
            email: "johndoe@mail.com",
            firstName: "John",
            lastName: "Doe",
            subscriptionTier: { tier: "Pro" },
          },
        },
      }).as("refreshRequest");
    });

    it("displays user details when authenticated", () => {
      cy.visit("http://localhost:3000/account");

      cy.wait("@refreshRequest");

      // User's name should be visible
      cy.contains("John").should("be.visible");
      cy.contains("Doe").should("be.visible");

      // Welcome message
      cy.contains("Welcome to your account").should("be.visible");

      // Subscription tier
      cy.contains("Pro plan").should("be.visible");
    });
  });
});
