import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginForm } from "../loginForm";
import authReducer from "common/redux/slices/authSlice";
import api from "common/utils/apiCore";

jest.mock("common/utils/apiCore");
const mockedApi = api as jest.Mocked<typeof api>;

const createMockStore = () => {
  return configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

describe("LoginForm Component", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render login form with all fields", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    it("should render email input with placeholder", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      expect(emailInput).toBeInTheDocument();
    });

    it("should render password input with placeholder", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const submitButton = screen.getByRole("button", { name: /login/i });
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe("password visibility toggle", () => {
    it("should hide password by default", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const passwordInput = screen.getByPlaceholderText(
        /enter password/i
      ) as HTMLInputElement;
      expect(passwordInput.type).toBe("password");
    });

    it("should toggle password visibility when eye icon clicked", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const passwordInput = screen.getByPlaceholderText(
        /enter password/i
      ) as HTMLInputElement;

      expect(passwordInput.type).toBe("password");

      const toggleButtons = screen.getAllByRole(
        "button"
      ) as HTMLButtonElement[];
      const toggleButton = toggleButtons.find((btn) => btn.type === "button");

      if (toggleButton) {
        await user.click(toggleButton);

        await waitFor(() => {
          expect(passwordInput.type).toBe("text");
        });

        await user.click(toggleButton);

        await waitFor(() => {
          expect(passwordInput.type).toBe("password");
        });
      }
    });
  });

  describe("form validation", () => {
    it("should show error for invalid email format", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "invalid-email");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it("should show error for short password", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/password must be at least 4 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("should not submit with empty fields", async () => {
      const user = userEvent.setup();
      const mockOnSuccess = jest.fn();

      render(
        <Provider store={store}>
          <LoginForm onSuccess={mockOnSuccess} />
        </Provider>
      );

      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSuccess).not.toHaveBeenCalled();
      });
    });

    it("should accept valid email and password", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);

      await user.type(emailInput, "valid@example.com");
      await user.type(passwordInput, "validPass123");

      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password must be/i)).not.toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    it("should call onSuccess callback on successful login", async () => {
      const user = userEvent.setup();
      const mockOnSuccess = jest.fn();

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            firstName: "Test",
            lastName: "User",
          },
          accessToken: "mock-token",
        },
      });

      render(
        <Provider store={store}>
          <LoginForm onSuccess={mockOnSuccess} />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      });
    });

    it("should display server error on failed login", async () => {
      const user = userEvent.setup();

      mockedApi.post.mockRejectedValueOnce({
        response: {
          data: { error: "Invalid credentials" },
        },
      });

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "wrong@example.com");
      await user.type(passwordInput, "wrongpass");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });
    });

    it("should convert email to lowercase on input", async () => {
      const user = userEvent.setup();

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(
        /enter your email/i
      ) as HTMLInputElement;

      await user.type(emailInput, "Test@EXAMPLE.COM");

      await waitFor(() => {
        expect(emailInput.value).toBe("test@example.com");
      });
    });

    it("should clear server error on new submission attempt", async () => {
      const user = userEvent.setup();

      mockedApi.post.mockRejectedValueOnce({
        response: { data: { error: "First error" } },
      });

      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const passwordInput = screen.getByPlaceholderText(/enter password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "pass1234");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/first error/i)).toBeInTheDocument();
      });

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: "1",
            email: "test@example.com",
            firstName: "Test",
            lastName: "User",
          },
          accessToken: "token",
        },
      });

      await user.clear(passwordInput);
      await user.type(passwordInput, "correctpass");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/first error/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("accessibility", () => {
    it("should have proper labels for form fields", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("should have correct form structure", () => {
      render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      const forms = document.querySelectorAll("form");
      expect(forms.length).toBeGreaterThan(0);
    });
  });

  describe("snapshot", () => {
    it("should match snapshot", () => {
      const { container } = render(
        <Provider store={store}>
          <LoginForm />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
