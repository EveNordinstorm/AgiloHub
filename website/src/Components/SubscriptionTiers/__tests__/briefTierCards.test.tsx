import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import BriefTierCards from "../briefTierCards";
import subscriptionReducer, {
  fetchSubscriptionTiers,
} from "common/redux/slices/subscriptionSlice";

jest.mock("common/redux/slices/subscriptionSlice", () => {
  const actual = jest.requireActual(
    "common/redux/slices/subscriptionSlice"
  ) as typeof import("common/redux/slices/subscriptionSlice");
  return {
    __esModule: true,
    ...actual,
    fetchSubscriptionTiers: jest.fn(() => ({
      type: "subscription/fetchTiers/fulfilled",
      payload: [],
    })),
  };
});

jest.mock("../../TierStars/FreeStar", () => ({
  FreeStar: ({ className }: { className: string }) => (
    <div data-testid="free-star" className={className}>
      FreeStar
    </div>
  ),
}));

jest.mock("../../TierStars/ProStar", () => ({
  ProStar: ({ className }: { className: string }) => (
    <div data-testid="pro-star" className={className}>
      ProStar
    </div>
  ),
}));

jest.mock("../../TierStars/EnterpriseStar", () => ({
  EnterpriseStar: ({ className }: { className: string }) => (
    <div data-testid="enterprise-star" className={className}>
      EnterpriseStar
    </div>
  ),
}));

const mockTiers = [
  {
    id: "1",
    tier: "Free",
    features: ["5 Projects", "Basic Support", "Community Access"],
    buttonText: "Get Started",
  },
  {
    id: "2",
    tier: "Pro",
    features: [
      "Unlimited Projects",
      "Priority Support",
      "Advanced Analytics",
      "Custom Integrations",
    ],
    buttonText: "Upgrade to Pro",
  },
  {
    id: "3",
    tier: "Enterprise",
    features: [
      "Everything in Pro",
      "Custom Integrations",
      "Dedicated Support",
      "SLA Guarantee",
      "Training & Onboarding",
    ],
    buttonText: "Contact Sales",
  },
];

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: { subscription: subscriptionReducer },
    preloadedState: {
      subscription: {
        tiers: [],
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe("BriefTierCards Component", () => {
  describe("loading state", () => {
    it("should render loading message when loading", () => {
      const store = createMockStore({ loading: true });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("should match snapshot while loading", () => {
      const store = createMockStore({ loading: true });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("error state", () => {
    it("should render error message when error occurs", () => {
      const store = createMockStore({ error: "Failed to load tiers" });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(
        screen.getByText(/error: failed to load tiers/i)
      ).toBeInTheDocument();
    });

    it("should display different error messages", () => {
      const errorMessages = [
        "Network error",
        "Server unavailable",
        "Unauthorized access",
      ];

      errorMessages.forEach((errorMsg) => {
        const store = createMockStore({ error: errorMsg });

        const { unmount } = render(
          <Provider store={store}>
            <BriefTierCards />
          </Provider>
        );

        expect(screen.getByText(new RegExp(errorMsg, "i"))).toBeInTheDocument();

        unmount();
      });
    });

    it("should match snapshot with error state", () => {
      const store = createMockStore({ error: "Test error message" });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("rendering tier cards", () => {
    it("should render all subscription tiers", () => {
      const store = createMockStore({ tiers: mockTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("Free")).toBeInTheDocument();
      expect(screen.getByText("Pro")).toBeInTheDocument();
      expect(screen.getByText("Enterprise")).toBeInTheDocument();
    });

    it("should render tier features correctly", () => {
      const store = createMockStore({ tiers: mockTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("5 Projects")).toBeInTheDocument();
      expect(screen.getByText("Unlimited Projects")).toBeInTheDocument();
      expect(screen.getByText("Dedicated Support")).toBeInTheDocument();
      expect(screen.getByText("SLA Guarantee")).toBeInTheDocument();
    });

    it("should render correct button text for each tier", () => {
      const store = createMockStore({ tiers: mockTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("Get Started")).toBeInTheDocument();
      expect(screen.getByText("Upgrade to Pro")).toBeInTheDocument();
      expect(screen.getByText("Contact Sales")).toBeInTheDocument();
    });

    it("should render correct star icon for each tier", () => {
      const store = createMockStore({ tiers: mockTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByTestId("free-star")).toBeInTheDocument();
      expect(screen.getByTestId("pro-star")).toBeInTheDocument();
      expect(screen.getByTestId("enterprise-star")).toBeInTheDocument();
    });

    it("should render correct number of feature items per tier", () => {
      const store = createMockStore({ tiers: mockTiers });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      const listItems = container.querySelectorAll("li");

      expect(listItems).toHaveLength(12);
    });
  });

  describe("snapshot testing", () => {
    it("should match snapshot with all tiers", () => {
      const store = createMockStore({ tiers: mockTiers });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with empty tiers", () => {
      const store = createMockStore({ tiers: [] });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with single tier", () => {
      const store = createMockStore({ tiers: [mockTiers[0]] });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("edge cases", () => {
    it("should handle empty tiers array", () => {
      const store = createMockStore({ tiers: [] });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      expect(grid?.children).toHaveLength(0);
    });

    it("should handle tier with minimal features", () => {
      const minimalTier = [
        {
          id: "1",
          tier: "Basic",
          features: ["One Feature"],
          buttonText: "Start",
        },
      ];

      const store = createMockStore({ tiers: minimalTier });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("Basic")).toBeInTheDocument();
      expect(screen.getByText("One Feature")).toBeInTheDocument();
    });

    it("should handle tier with many features", () => {
      const tierWithManyFeatures = [
        {
          id: "1",
          tier: "Ultimate",
          features: Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`),
          buttonText: "Get Ultimate",
        },
      ];

      const store = createMockStore({ tiers: tierWithManyFeatures });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      for (let i = 1; i <= 10; i++) {
        expect(screen.getByText(`Feature ${i}`)).toBeInTheDocument();
      }
    });

    it("should handle unknown tier names gracefully", () => {
      const unknownTier = [
        {
          id: "1",
          tier: "UnknownTier",
          features: ["Feature 1"],
          buttonText: "Get Started",
        },
      ];

      const store = createMockStore({ tiers: unknownTier });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("UnknownTier")).toBeInTheDocument();
      expect(container).toBeTruthy();
    });
  });

  describe("layout and structure", () => {
    it("should render cards in grid layout", () => {
      const store = createMockStore({ tiers: mockTiers });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("should render buttons for all tiers", () => {
      const store = createMockStore({ tiers: mockTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);
    });

    it("should apply correct styling classes", () => {
      const store = createMockStore({ tiers: [mockTiers[0]] });

      const { container } = render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(container.querySelector(".bg-white")).toBeInTheDocument();
      expect(container.querySelector(".rounded-t-full")).toBeInTheDocument();
    });
  });

  describe("Redux integration", () => {
    it("should read tiers from Redux store", () => {
      const customTiers = [
        {
          id: "custom-1",
          tier: "Custom Tier",
          features: ["Custom Feature"],
          buttonText: "Custom Button",
        },
      ];

      const store = createMockStore({ tiers: customTiers });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText("Custom Tier")).toBeInTheDocument();
      expect(screen.getByText("Custom Feature")).toBeInTheDocument();
      expect(screen.getByText("Custom Button")).toBeInTheDocument();
    });

    it("should respect Redux loading state", () => {
      const store = createMockStore({
        tiers: mockTiers,
        loading: true,
      });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      expect(screen.queryByText("Free")).not.toBeInTheDocument();
    });

    it("should respect Redux error state over data", () => {
      const store = createMockStore({
        tiers: mockTiers,
        error: "Critical error",
      });

      render(
        <Provider store={store}>
          <BriefTierCards />
        </Provider>
      );

      expect(screen.getByText(/error: critical error/i)).toBeInTheDocument();
      expect(screen.queryByText("Free")).not.toBeInTheDocument();
    });
  });
});
