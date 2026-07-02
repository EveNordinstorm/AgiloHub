import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { LoginSchema, RegisterSchema } from "../auth";

describe("Auth Validation Schemas", () => {
  describe("LoginSchema", () => {
    describe("valid inputs", () => {
      it("should validate correct login data", () => {
        const validData = {
          email: "test@example.com",
          password: "Pass1234",
        };

        const result = LoginSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(validData);
        }
      });

      it("should accept email with different valid formats", () => {
        const validEmails = [
          "user@domain.com",
          "test.user@example.co.uk",
          "name+tag@subdomain.example.com",
        ];

        validEmails.forEach((email) => {
          const result = LoginSchema.safeParse({
            email,
            password: "validPass",
          });
          expect(result.success).toBe(true);
        });
      });

      it("should accept password with minimum length", () => {
        const result = LoginSchema.safeParse({
          email: "test@example.com",
          password: "1234",
        });

        expect(result.success).toBe(true);
      });

      it("should accept long passwords", () => {
        const result = LoginSchema.safeParse({
          email: "test@example.com",
          password: "VeryLongPasswordWith123Numbers!",
        });

        expect(result.success).toBe(true);
      });
    });

    describe("invalid email", () => {
      it("should reject invalid email format", () => {
        const invalidData = {
          email: "not-an-email",
          password: "Pass1234",
        };

        const result = LoginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("Invalid email address.");
          expect(result.error.issues[0].path).toEqual(["email"]);
        }
      });

      it("should reject email without @ symbol", () => {
        const result = LoginSchema.safeParse({
          email: "testexample.com",
          password: "Pass1234",
        });

        expect(result.success).toBe(false);
      });

      it("should reject email without domain", () => {
        const result = LoginSchema.safeParse({
          email: "test@",
          password: "Pass1234",
        });

        expect(result.success).toBe(false);
      });

      it("should reject empty email", () => {
        const result = LoginSchema.safeParse({
          email: "",
          password: "Pass1234",
        });

        expect(result.success).toBe(false);
      });
    });

    describe("invalid password", () => {
      it("should reject password shorter than 4 characters", () => {
        const invalidData = {
          email: "test@example.com",
          password: "123",
        };

        const result = LoginSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Password must be at least 4 characters."
          );
          expect(result.error.issues[0].path).toEqual(["password"]);
        }
      });

      it("should reject empty password", () => {
        const result = LoginSchema.safeParse({
          email: "test@example.com",
          password: "",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            "Password must be at least 4 characters."
          );
        }
      });
    });

    describe("missing fields", () => {
      it("should reject when email is missing", () => {
        const result = LoginSchema.safeParse({
          password: "Pass1234",
        });

        expect(result.success).toBe(false);
      });

      it("should reject when password is missing", () => {
        const result = LoginSchema.safeParse({
          email: "test@example.com",
        });

        expect(result.success).toBe(false);
      });

      it("should reject when both fields are missing", () => {
        const result = LoginSchema.safeParse({});
        expect(result.success).toBe(false);
      });
    });
  });

  describe("RegisterSchema", () => {
    describe("valid inputs", () => {
      it("should validate correct registration data", () => {
        const validData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        };

        const result = RegisterSchema.safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(validData);
        }
      });

      it("should accept names with single character", () => {
        const result = RegisterSchema.safeParse({
          firstName: "A",
          lastName: "B",
          email: "ab@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        });

        expect(result.success).toBe(true);
      });

      it("should accept names with spaces and special characters", () => {
        const result = RegisterSchema.safeParse({
          firstName: "Mary-Jane O'Brien",
          lastName: "Smith Jr.",
          email: "mary@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        });

        expect(result.success).toBe(true);
      });
    });

    describe("password matching", () => {
      it("should reject when passwords do not match", () => {
        const invalidData = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "Pass1234",
          confirmPassword: "Different123",
        };

        const result = RegisterSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          const passwordError = result.error.issues.find(
            (issue) => issue.message === "Passwords do not match."
          );
          expect(passwordError).toBeDefined();
          expect(passwordError?.path).toEqual(["confirmPassword"]);
        }
      });

      it("should pass when passwords match exactly", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "MySecurePass123!",
          confirmPassword: "MySecurePass123!",
        });

        expect(result.success).toBe(true);
      });

      it("should be case-sensitive for password matching", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "Password",
          confirmPassword: "password",
        });

        expect(result.success).toBe(false);
      });
    });

    describe("required fields", () => {
      it("should require firstName", () => {
        const invalidData = {
          firstName: "",
          lastName: "Doe",
          email: "john@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        };

        const result = RegisterSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          const firstNameError = result.error.issues.find(
            (issue) => issue.path[0] === "firstName"
          );
          expect(firstNameError?.message).toBe("First name is required.");
        }
      });

      it("should require lastName", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "",
          email: "john@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
          const lastNameError = result.error.issues.find(
            (issue) => issue.path[0] === "lastName"
          );
          expect(lastNameError?.message).toBe("Last name is required.");
        }
      });

      it("should require valid email", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "invalid-email",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        });

        expect(result.success).toBe(false);
      });

      it("should require password with minimum length", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "abc",
          confirmPassword: "abc",
        });

        expect(result.success).toBe(false);
      });

      it("should require confirmPassword with minimum length", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "Pass1234",
          confirmPassword: "abc",
        });

        expect(result.success).toBe(false);
      });
    });

    describe("multiple validation errors", () => {
      it("should return all validation errors at once", () => {
        const invalidData = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        };

        const result = RegisterSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThanOrEqual(4);
        }
      });

      it("should handle both invalid format and password mismatch", () => {
        const result = RegisterSchema.safeParse({
          firstName: "John",
          lastName: "Doe",
          email: "not-an-email",
          password: "Pass1234",
          confirmPassword: "Different",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
        }
      });
    });

    describe("edge cases", () => {
      it("should handle extremely long valid inputs", () => {
        const result = RegisterSchema.safeParse({
          firstName: "A".repeat(100),
          lastName: "B".repeat(100),
          email: "test@example.com",
          password: "P".repeat(100),
          confirmPassword: "P".repeat(100),
        });

        expect(result.success).toBe(true);
      });

      it("should handle Unicode characters in names", () => {
        const result = RegisterSchema.safeParse({
          firstName: "李明",
          lastName: "José",
          email: "test@example.com",
          password: "Pass1234",
          confirmPassword: "Pass1234",
        });

        expect(result.success).toBe(true);
      });
    });
  });
});
