import React from "react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PointsDisplay from "../PointsDisplay";
import pointsReducer from "common/src/redux/slices/pointsSlice";
import authReducer from "common/src/redux/slices/authSlice";

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      points: pointsReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: {
      points: { total: 0, history: [], loading: false, error: undefined },
      auth: {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
      },
      ...initialState,
    },
  });
};

describe("PointsDisplay Component", () => {
  describe("rendering", () => {
    it("should render component successfully", () => {
      const store = createMockStore();

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toBeTruthy();
    });

    it("should display points total from Redux state", () => {
      const store = createMockStore({
        points: { total: 150, history: [], loading: false },
        auth: {
          user: {
            id: "1",
            email: "test@test.com",
            firstName: "John",
            lastName: "Doe",
          },
          accessToken: "mock-token",
          loading: false,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("150")).toBeTruthy();
    });

    it("should display zero points for new user", () => {
      const store = createMockStore({
        points: { total: 0, history: [], loading: false },
        auth: {
          user: {
            id: "2",
            email: "newuser@test.com",
            firstName: "Jane",
            lastName: "Smith",
          },
          accessToken: "mock-token-2",
          loading: false,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should display large point values correctly", () => {
      const store = createMockStore({
        points: { total: 9999, history: [], loading: false },
        auth: {
          user: {
            id: "3",
            email: "pro@test.com",
            firstName: "Pro",
            lastName: "User",
          },
          accessToken: "mock-token-3",
          loading: false,
          error: null,
        },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("9999")).toBeTruthy();
    });
  });

  describe("user authentication states", () => {
    it("should render when user is not logged in", () => {
      const store = createMockStore({
        auth: {
          user: null,
          accessToken: null,
          loading: false,
          error: null,
        },
        points: { total: 0, history: [], loading: false },
      });

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toBeTruthy();
      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should render when user is authenticated", () => {
      const store = createMockStore({
        auth: {
          user: {
            id: "1",
            email: "authenticated@test.com",
            firstName: "Auth",
            lastName: "User",
          },
          accessToken: "valid-token",
          loading: false,
          error: null,
        },
        points: { total: 250, history: [], loading: false },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("250")).toBeTruthy();
    });
  });

  describe("different point values", () => {
    it("should handle single digit points", () => {
      const store = createMockStore({
        points: { total: 5, history: [], loading: false },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("5")).toBeTruthy();
    });

    it("should handle double digit points", () => {
      const store = createMockStore({
        points: { total: 42, history: [], loading: false },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("42")).toBeTruthy();
    });

    it("should handle triple digit points", () => {
      const store = createMockStore({
        points: { total: 777, history: [], loading: false },
      });

      render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("777")).toBeTruthy();
    });
  });

  describe("snapshot testing", () => {
    it("should match snapshot with zero points", () => {
      const store = createMockStore();

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with points", () => {
      const store = createMockStore({
        points: { total: 100, history: [], loading: false },
      });

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe("Redux integration", () => {
    it("should read points from Redux state correctly", () => {
      const testCases = [0, 10, 50, 100, 500, 1000];

      testCases.forEach((points) => {
        const store = createMockStore({
          points: { total: points, history: [], loading: false },
        });

        const { unmount } = render(
          <Provider store={store}>
            <PointsDisplay />
          </Provider>
        );

        expect(screen.getByText(String(points))).toBeTruthy();

        unmount();
      });
    });

    it("should handle Redux state updates", () => {
      const store = createMockStore({
        points: { total: 50, history: [], loading: false },
      });

      const { rerender } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("50")).toBeTruthy();

      store.dispatch({ type: "points/setTotal", payload: 100 });

      rerender(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(screen.getByText("100")).toBeTruthy();
    });
  });

  describe("error handling", () => {
    it("should render when points state has an error", () => {
      const store = createMockStore({
        points: {
          total: 0,
          history: [],
          loading: false,
          error: "Failed to fetch points",
        },
      });

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toBeTruthy();
    });

    it("should render when points state is loading", () => {
      const store = createMockStore({
        points: { total: 0, history: [], loading: true },
      });

      const { toJSON } = render(
        <Provider store={store}>
          <PointsDisplay />
        </Provider>
      );

      expect(toJSON()).toBeTruthy();
    });
  });
});
