import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import streakReducer, {
  markDayChecked,
  resetWeek,
  hydrateStreak,
  StreakState,
  Weekday,
} from "../loginStreakSlice";

describe("loginStreakSlice", () => {
  const initialState: StreakState = {
    daysChecked: [],
    lastLoginDate: undefined,
    currentPoints: 0,
  };

  describe("initial state", () => {
    it("should return the initial state when passed undefined state", () => {
      const result = streakReducer(undefined, { type: "unknown" });

      expect(result).toEqual(initialState);
    });
  });

  describe("markDayChecked action", () => {
    it("should mark Monday as checked and award 10 points", () => {
      const action = markDayChecked("Mon");

      const state = streakReducer(initialState, action);

      expect(state.daysChecked).toContain("Mon");
      expect(state.daysChecked).toHaveLength(1);
      expect(state.currentPoints).toBe(10);
      expect(state.lastLoginDate).toBeDefined();
    });

    it("should mark Tuesday as checked and award 20 points", () => {
      const action = markDayChecked("Tue");
      const state = streakReducer(initialState, action);

      expect(state.daysChecked).toContain("Tue");
      expect(state.currentPoints).toBe(20);
    });

    it("should mark Wednesday as checked and award 30 points", () => {
      const action = markDayChecked("Wed");
      const state = streakReducer(initialState, action);

      expect(state.daysChecked).toContain("Wed");
      expect(state.currentPoints).toBe(30);
    });

    it("should mark Thursday as checked and award 40 points", () => {
      const action = markDayChecked("Thu");
      const state = streakReducer(initialState, action);

      expect(state.daysChecked).toContain("Thu");
      expect(state.currentPoints).toBe(40);
    });

    it("should mark Friday as checked and award 50 points", () => {
      const action = markDayChecked("Fri");
      const state = streakReducer(initialState, action);

      expect(state.daysChecked).toContain("Fri");
      expect(state.currentPoints).toBe(50);
    });

    it("should not duplicate days when marking same day twice", () => {
      let state = streakReducer(initialState, markDayChecked("Mon"));
      const firstLoginDate = state.lastLoginDate;
      const firstPoints = state.currentPoints;

      state = streakReducer(state, markDayChecked("Mon"));

      expect(state.daysChecked).toEqual(["Mon"]);
      expect(state.currentPoints).toBe(firstPoints);
      expect(state.lastLoginDate).toBe(firstLoginDate);
    });

    it("should allow marking multiple different days", () => {
      let state = initialState;

      state = streakReducer(state, markDayChecked("Mon"));
      expect(state.daysChecked).toEqual(["Mon"]);
      expect(state.currentPoints).toBe(10);

      state = streakReducer(state, markDayChecked("Wed"));
      expect(state.daysChecked).toEqual(["Mon", "Wed"]);
      expect(state.currentPoints).toBe(30);

      state = streakReducer(state, markDayChecked("Fri"));
      expect(state.daysChecked).toEqual(["Mon", "Wed", "Fri"]);
      expect(state.currentPoints).toBe(50);
    });

    it("should update lastLoginDate to valid ISO string", () => {
      const before = new Date().getTime();
      const state = streakReducer(initialState, markDayChecked("Mon"));
      const after = new Date().getTime();

      expect(state.lastLoginDate).toBeDefined();
      const loginDate = new Date(state.lastLoginDate!).getTime();

      expect(loginDate).toBeGreaterThanOrEqual(before);
      expect(loginDate).toBeLessThanOrEqual(after);
    });
  });

  describe("resetWeek action", () => {
    it("should reset streak to initial state", () => {
      let state: StreakState = {
        daysChecked: ["Mon", "Tue", "Wed"],
        lastLoginDate: "2026-01-20T10:00:00.000Z",
        currentPoints: 30,
      };

      state = streakReducer(state, resetWeek());

      expect(state).toEqual(initialState);
      expect(state.daysChecked).toHaveLength(0);
      expect(state.currentPoints).toBe(0);
      expect(state.lastLoginDate).toBeUndefined();
    });

    it("should reset even when already at initial state", () => {
      const state = streakReducer(initialState, resetWeek());
      expect(state).toEqual(initialState);
    });
  });

  describe("hydrateStreak action", () => {
    it("should hydrate streak from persisted data", () => {
      const persistedData: StreakState = {
        daysChecked: ["Mon", "Tue", "Wed"],
        lastLoginDate: "2026-01-20T10:00:00.000Z",
        currentPoints: 30,
      };

      const state = streakReducer(initialState, hydrateStreak(persistedData));

      expect(state).toEqual(persistedData);
      expect(state.daysChecked).toEqual(["Mon", "Tue", "Wed"]);
      expect(state.lastLoginDate).toBe("2026-01-20T10:00:00.000Z");
      expect(state.currentPoints).toBe(30);
    });

    it("should replace existing state when hydrating", () => {
      let state = streakReducer(initialState, markDayChecked("Fri"));
      expect(state.currentPoints).toBe(50);

      const newData: StreakState = {
        daysChecked: ["Mon"],
        lastLoginDate: "2026-01-15T08:00:00.000Z",
        currentPoints: 10,
      };
      state = streakReducer(state, hydrateStreak(newData));

      expect(state).toEqual(newData);
      expect(state.daysChecked).not.toContain("Fri");
    });

    it("should handle hydrating with empty data", () => {
      const emptyData: StreakState = {
        daysChecked: [],
        lastLoginDate: undefined,
        currentPoints: 0,
      };

      const state = streakReducer(initialState, hydrateStreak(emptyData));
      expect(state).toEqual(initialState);
    });
  });

  describe("state immutability", () => {
    it("should not mutate the original state when marking day", () => {
      const originalState: StreakState = {
        daysChecked: [],
        lastLoginDate: undefined,
        currentPoints: 0,
      };

      const newState = streakReducer(originalState, markDayChecked("Mon"));

      expect(originalState.daysChecked).toHaveLength(0);
      expect(originalState.currentPoints).toBe(0);
      expect(newState.daysChecked).toHaveLength(1);
      expect(newState.currentPoints).toBe(10);
    });
  });

  describe("edge cases", () => {
    it("should handle marking days in non-sequential order", () => {
      let state = initialState;

      state = streakReducer(state, markDayChecked("Fri"));
      state = streakReducer(state, markDayChecked("Mon"));
      state = streakReducer(state, markDayChecked("Wed"));

      expect(state.daysChecked).toEqual(["Fri", "Mon", "Wed"]);
      expect(state.currentPoints).toBe(30);
    });

    it("should handle rapid consecutive actions", () => {
      let state = initialState;

      const days: Weekday[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      days.forEach((day) => {
        state = streakReducer(state, markDayChecked(day));
      });

      expect(state.daysChecked).toHaveLength(5);
      expect(state.currentPoints).toBe(50);
    });
  });
});
