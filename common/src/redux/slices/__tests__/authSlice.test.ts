import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import authReducer, {
  loginUser,
  registerUser,
  logout,
  refreshAccessToken,
  AuthState,
} from "../authSlice";
import api from "../../../utils/apiCore";

jest.mock("../../../utils/apiCore");
const mockedApi = api as jest.Mocked<typeof api>;

// Define proper types for the test store
type RootState = {
  auth: AuthState;
};

// Helper function to create a properly typed store
const createTestStore = () => {
  return configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the store type from the createTestStore function
type TestStore = ReturnType<typeof createTestStore>;
type AppDispatch = TestStore['dispatch'];

describe("authSlice async thunks", () => {
  let store: TestStore;

  beforeEach(() => {
    store = createTestStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser thunk", () => {
    it("should handle successful login", async () => {
      const mockResponse = {
        data: {
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
          accessToken: "mock-access-token-123",
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "password123" })
      );

      const state = store.getState().auth;
      expect(state.user).toEqual(mockResponse.data.user);
      expect(state.accessToken).toBe("mock-access-token-123");
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/login", {
        email: "test@test.com",
        password: "password123",
      });
      expect(mockedApi.post).toHaveBeenCalledTimes(1);
    });

    it("should handle failed login with error message", async () => {
      const mockError = {
        response: {
          data: { error: "Invalid credentials" },
        },
      };

      mockedApi.post.mockRejectedValueOnce(mockError);

      await store.dispatch(
        loginUser({ email: "wrong@test.com", password: "wrongpass" })
      );

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error).toBe("Invalid credentials");
    });

    it("should handle failed login with default error message", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "pass" })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Login failed");
    });

    it("should set loading state during login", async () => {
      mockedApi.post.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      const loginPromise = store.dispatch(
        loginUser({ email: "test@test.com", password: "password123" })
      );

      let state = store.getState().auth;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();

      await loginPromise;

      state = store.getState().auth;
      expect(state.loading).toBe(false);
    });

    it("should clear previous errors on new login attempt", async () => {
      mockedApi.post.mockRejectedValueOnce({
        response: { data: { error: "First error" } },
      });

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "wrong" })
      );

      expect(store.getState().auth.error).toBe("First error");

      mockedApi.post.mockResolvedValueOnce({
        data: {
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
          accessToken: "token",
        },
      });

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "correct" })
      );

      const state = store.getState().auth;
      expect(state.error).toBeNull();
      expect(state.user).toBeTruthy();
    });
  });

  describe("registerUser thunk", () => {
    it("should handle successful registration", async () => {
      const mockResponse = {
        data: {
          user: {
            id: "2",
            email: "newuser@test.com",
            firstName: "Jane",
            lastName: "Smith",
          },
          accessToken: "new-user-token-456",
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await store.dispatch(
        registerUser({
          email: "newuser@test.com",
          password: "newpass123",
          firstName: "Jane",
          lastName: "Smith",
        })
      );

      const state = store.getState().auth;
      expect(state.user).toEqual(mockResponse.data.user);
      expect(state.accessToken).toBe("new-user-token-456");
      expect(state.loading).toBe(false);

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/register", {
        email: "newuser@test.com",
        password: "newpass123",
        firstName: "Jane",
        lastName: "Smith",
      });
    });

    it("should handle registration failure (email exists)", async () => {
      const mockError = {
        response: {
          data: { error: "Email already exists" },
        },
      };

      mockedApi.post.mockRejectedValueOnce(mockError);

      await store.dispatch(
        registerUser({
          email: "existing@test.com",
          password: "password",
          firstName: "Test",
          lastName: "User",
        })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Email already exists");
      expect(state.user).toBeNull();
    });

    it("should set loading state during registration", async () => {
      mockedApi.post.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

      const registerPromise = store.dispatch(
        registerUser({
          email: "test@test.com",
          password: "pass",
          firstName: "Test",
          lastName: "User",
        })
      );

      expect(store.getState().auth.loading).toBe(true);

      await registerPromise;

      expect(store.getState().auth.loading).toBe(false);
    });
  });

  describe("refreshAccessToken thunk", () => {
    it("should refresh token with mobile refresh token", async () => {
      const mockResponse = {
        data: {
          accessToken: "new-access-token-789",
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await store.dispatch(refreshAccessToken("mobile-refresh-token"));

      const state = store.getState().auth;
      expect(state.accessToken).toBe("new-access-token-789");
      expect(state.user).toEqual(mockResponse.data.user);

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/refresh", {
        refreshToken: "mobile-refresh-token",
      });
    });

    it("should refresh token for web (no token param)", async () => {
      const mockResponse = {
        data: {
          accessToken: "web-access-token",
          user: {
            id: "1",
            email: "web@test.com",
            firstName: "Web",
            lastName: "User",
          },
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockResponse);

      await store.dispatch(refreshAccessToken(undefined));

      const state = store.getState().auth;
      expect(state.accessToken).toBe("web-access-token");

      expect(mockedApi.post).toHaveBeenCalledWith("/auth/refresh");
    });
  });

  describe("logout action", () => {
    it("should clear user and token on logout", async () => {
      const mockLoginResponse = {
        data: {
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
          accessToken: "token-to-clear",
        },
      };

      mockedApi.post.mockResolvedValueOnce(mockLoginResponse);

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "pass" })
      );

      let state = store.getState().auth;
      expect(state.user).toBeTruthy();
      expect(state.accessToken).toBe("token-to-clear");

      store.dispatch(logout());

      state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.error).toBeNull();
    });

    it("should work when already logged out", () => {
      const initialState = store.getState().auth;
      expect(initialState.user).toBeNull();

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
    });

    it("should clear errors on logout", async () => {
      mockedApi.post.mockRejectedValueOnce({
        response: { data: { error: "Login failed" } },
      });

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "wrong" })
      );

      expect(store.getState().auth.error).toBeTruthy();

      store.dispatch(logout());

      expect(store.getState().auth.error).toBeNull();
    });
  });

  describe("concurrent operations", () => {
    it("should handle multiple login attempts correctly", async () => {
      const mockResponse = {
        data: {
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
          accessToken: "final-token",
        },
      };

      mockedApi.post.mockResolvedValue(mockResponse);

      await Promise.all([
        store.dispatch(loginUser({ email: "test@test.com", password: "pass" })),
        store.dispatch(loginUser({ email: "test@test.com", password: "pass" })),
      ]);

      const state = store.getState().auth;
      expect(state.user).toBeTruthy();
      expect(state.accessToken).toBe("final-token");
    });
  });

  describe("edge cases", () => {
    it("should handle network errors", async () => {
      mockedApi.post.mockRejectedValueOnce(new Error("Network Error"));

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "pass" })
      );

      const state = store.getState().auth;
      expect(state.error).toBe("Login failed");
      expect(state.loading).toBe(false);
    });

    it("should handle malformed API responses", async () => {
      mockedApi.post.mockResolvedValueOnce({ data: {} });

      await store.dispatch(
        loginUser({ email: "test@test.com", password: "pass" })
      );

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
    });
  });
});
